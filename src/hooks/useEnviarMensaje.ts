import { useCallback, useState } from 'react'
import { createMensaje } from '@/services/mensajes'
import type { MensajeIncidencia } from '@/types'
import toast from 'react-hot-toast'
import { useNotifications } from './useNotifications'

export const useEnviarMensaje = () => {
  const [loading, setLoading] = useState(false)
  const { notificarCambio } = useNotifications()

  const enviarMensaje = useCallback(
    async (incidencia: any, idUsuario: number, mensaje: string) => {
      if (!mensaje.trim()) {
        toast.error('El mensaje no puede estar vacío')
        return false
      }

      try {
        setLoading(true)

        const now = new Date().toISOString()

        const nuevoMensaje: MensajeIncidencia = {
          idIncidencia: incidencia.id,
          idUsuario,
          mensaje: mensaje.trim(),
          fecha: now,
        }

        await createMensaje(nuevoMensaje)

        // 🔥 SOLO EVENTO, NO LOGICA EXTRA
        await notificarCambio(incidencia, 'Nuevo comentario en la incidencia')

        toast.success('Mensaje enviado')
        return true
      } catch (err) {
        console.error('Error enviando mensaje:', err)
        toast.error('Error al enviar mensaje')
        return false
      } finally {
        setLoading(false)
      }
    },
    [notificarCambio]
  )

  return { enviarMensaje, loading }
}
