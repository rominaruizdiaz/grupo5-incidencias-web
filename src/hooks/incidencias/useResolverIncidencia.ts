import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'
import { crearMensajeTracking } from '@/services/tracking'

export const useResolverIncidencia = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const resolver = useCallback(
    async (idIncidencia: number, descripcion?: string) => {
      try {
        setLoading(true)

        await updateIncidencia(idIncidencia, {
          estado: IncidenciaEstado.RESUELTO,
          fechaResolucion: new Date().toISOString(),
        })

        const incidencia = await getIncidenciaById(idIncidencia)

        // Notificar resolución
        await emitNotification({
          event: NotificationEvent.RESOLUCION,
          incidencia,
          titulo: 'resolucion',
          mensaje: `Incidencia resuelta: "${incidencia.titulo}"`,
          actorId: usuario?.id,
        })

        // Crear mensaje en el chat
        if (usuario) {
          const mensajeResolucion = `${usuario.nombre} marcó como resuelto${descripcion ? `: ${descripcion}` : ''}`
          await crearMensajeTracking(idIncidencia, usuario, mensajeResolucion)
        }

        toast.success('Incidencia resuelta')
        return true
      } catch (err) {
        console.error('Error resolviendo incidencia:', err)
        toast.error('Error al resolver')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { resolver, loading }
}
