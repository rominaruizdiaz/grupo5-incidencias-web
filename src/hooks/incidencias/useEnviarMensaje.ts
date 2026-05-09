import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { createMensaje } from '@/services/mensajes'
import type { Incidencia } from '@/types'

import { emitNotification } from '@/services/notification.service'
import { NotificationEvent } from '@/services/notification.events'

export const useEnviarMensaje = () => {
  const [loading, setLoading] = useState(false)

  const enviarMensaje = useCallback(
    async (
      incidencia: Incidencia,
      idUsuario: number,
      mensaje: string
    ): Promise<boolean> => {
      if (!mensaje.trim()) {
        toast.error('Mensaje vacío')
        return false
      }

      try {
        setLoading(true)

        await createMensaje({
          idIncidencia: incidencia.id,
          idUsuario,
          mensaje: mensaje.trim(),
          fecha: new Date().toISOString(),
        })

        await emitNotification({
          event: NotificationEvent.MENSAJE_NUEVO,
          incidencia,
          titulo: 'Nuevo mensaje',
          mensaje: 'Nuevo comentario en la incidencia',
          actorId: idUsuario,
        })

        toast.success('Mensaje enviado')
        return true
      } catch (err) {
        console.error(err)
        toast.error('Error al enviar mensaje')
        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { enviarMensaje, loading }
}
