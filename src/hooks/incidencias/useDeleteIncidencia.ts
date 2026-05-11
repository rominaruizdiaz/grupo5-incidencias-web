import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteIncidencia, getIncidenciaById } from '@/services/incidencias'

import { useAuthStore } from '@/store/auth.store'
import { NotificationEvent } from '@/services/notification.events'
import { emitNotification } from '@/services/notification.service'

export const useDeleteIncidencia = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const remove = async (id: number) => {
    setLoading(true)

    try {
      const incidencia = await getIncidenciaById(id)

      await deleteIncidencia(id)

      await emitNotification({
        event: NotificationEvent.BORRADO,
        incidencia,
        titulo: 'Incidencia eliminada',
        mensaje: `Se eliminó "${incidencia.titulo}"`,
        actorId: usuario?.id,
      })

      toast.success('Incidencia borrada correctamente')
      return true
    } catch (err) {
      console.error(err)
      toast.error('Error al borrar incidencia')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading }
}
