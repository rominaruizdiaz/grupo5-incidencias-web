import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import toast from 'react-hot-toast'

import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'
import { crearMensajeTracking } from '@/services/tracking'

export const useAsignarTecnico = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const asignarTecnico = useCallback(
    async (
      idIncidencia: number,
      idUsuarioAsignado: number,
      nombreTecnico: string
    ) => {
      try {
        setLoading(true)

        // actualiza la incidencia con el nuevo tecnico asignado
        await updateIncidencia(idIncidencia, {
          idUsuarioAsignado,
        })

        const incidencia = await getIncidenciaById(idIncidencia)

        // Notificar asignación
        await emitNotification({
          event: NotificationEvent.ASIGNACION,
          incidencia,
          titulo: 'Asignación',
          mensaje: `Se asignó técnico a "${incidencia.titulo}"`,
          actorId: usuario?.id,
        })

        // Crear mensaje en el chat
        if (usuario) {
          const mensajeAsignacion = `${usuario.nombre} asignó la incidencia a ${nombreTecnico}`
          await crearMensajeTracking(idIncidencia, usuario, mensajeAsignacion)
        }

        toast.success(`Incidencia asignada a ${nombreTecnico}`)
        return true
      } catch (err) {
        console.error(err)
        toast.error('Error al asignar incidencia')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { asignarTecnico, loading }
}
