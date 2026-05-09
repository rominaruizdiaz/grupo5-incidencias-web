import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import toast from 'react-hot-toast'

// asignar una incidencia a un técnico
import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'

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

        await emitNotification({
          event: NotificationEvent.ASIGNACION,
          incidencia,
          titulo: 'Asignación',
          mensaje: `Se asignó técnico a "${incidencia.titulo}"`,
          actorId: usuario?.id,
        })

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
