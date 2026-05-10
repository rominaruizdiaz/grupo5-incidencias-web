import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import { crearMensajeTracking, mensajesResolucion } from '@/services/tracking'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

import { emitNotification } from '@/services/notification.service'
import { NotificationEvent } from '@/services/notification.events'

// logica para reabrir una incidencia
export const useReabrirIncidencia = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const reabrirIncidencia = useCallback(
    async (
      idIncidencia: number,
      nuevoEstado: IncidenciaEstado = IncidenciaEstado.ACTIVO
    ) => {
      try {
        setLoading(true)

        await updateIncidencia(idIncidencia, {
          estado: nuevoEstado,
          fechaResolucion: null,
        })

        const incidencia = await getIncidenciaById(idIncidencia)

        await emitNotification({
          event: NotificationEvent.REABRIR,
          incidencia,
          titulo: 'reabrir',
          mensaje: `Incidencia reabierta: "${incidencia.titulo}"`,
          actorId: usuario?.id,
        })

        if (usuario) {
          const mensajeTracking = mensajesResolucion.reabierto(
            usuario.nombre,
            nuevoEstado
          )

          await crearMensajeTracking(idIncidencia, usuario, mensajeTracking)
        }

        toast.success(`Incidencia reabierta como ${nuevoEstado}`)
        return true
      } catch (err) {
        console.error('Error reabriendo incidencia:', err)
        toast.error('Error al reabrir incidencia')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { reabrirIncidencia, loading }
}
