import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import toast from 'react-hot-toast'

import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'
import { crearMensajeTracking } from '@/services/tracking'

export const useAutoAsignarTecnico = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const autoAsignar = useCallback(
    async (idIncidencia: number) => {
      if (!usuario) return false

      try {
        setLoading(true)

        await updateIncidencia(idIncidencia, {
          idUsuarioAsignado: usuario.id,
        })

        const incidencia = await getIncidenciaById(idIncidencia)

        // Notificar auto-asignación
        await emitNotification({
          event: NotificationEvent.ASIGNACION,
          incidencia,
          titulo: 'Asignación',
          mensaje: `${usuario.nombre} se auto-asignó a "${incidencia.titulo}"`,
          actorId: usuario.id,
        })

        // Crear mensaje en el chat
        const mensajeAsignacion = `${usuario.nombre} se auto-asignó a esta incidencia`
        await crearMensajeTracking(idIncidencia, usuario, mensajeAsignacion)

        toast.success('Te has asignado a la incidencia')
        return true
      } catch (err) {
        console.error(err)
        toast.error('Error al asignarte')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { autoAsignar, loading }
}
