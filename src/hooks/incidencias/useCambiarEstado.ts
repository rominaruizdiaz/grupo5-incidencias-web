import { useCallback, useState } from 'react'
import { updateIncidencia, getIncidenciaById } from '@/services/incidencias'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

// cambiar el estado de una incidencia (activo, en curso, resuelto)

import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'

export const useCambiarEstado = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const cambiarEstado = useCallback(
    async (idIncidencia: number, nuevoEstado: IncidenciaEstado) => {
      try {
        setLoading(true)

        // si se marca como "resuelto, se guarda la fecha, pero si uuelve a otro estado, se borra
        const updates: Record<string, any> = {
          estado: nuevoEstado,
          fechaResolucion:
            nuevoEstado === IncidenciaEstado.RESUELTO
              ? new Date().toISOString()
              : null,
        }

        await updateIncidencia(idIncidencia, updates)

        const incidencia = await getIncidenciaById(idIncidencia)

        await emitNotification({
          event: NotificationEvent.CAMBIO_ESTADO,
          incidencia,
          titulo: 'Cambio de estado',
          mensaje: `Estado cambiado a ${nuevoEstado} en "${incidencia.titulo}"`,
          actorId: usuario?.id,
        })

        toast.success(`Estado cambiado a ${nuevoEstado}`)
        return true
      } catch (err) {
        console.error(err)
        toast.error('Error al cambiar estado')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { cambiarEstado, loading }
}
