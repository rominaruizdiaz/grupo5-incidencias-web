import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

import { createMensaje } from '@/services/mensajes'
import { useNotifications } from '../notificaciones/useNotifications'

import type { MensajeIncidencia, Incidencia } from '@/types'

// enviar mensajes dentro de la incidencia
export const useEnviarMensaje = () => {
  const [loading, setLoading] = useState(false)

  const { notificarCambio } = useNotifications()

  const enviarMensaje = useCallback(
    async (
      incidencia: Incidencia,
      idUsuario: number,
      mensaje: string
    ): Promise<boolean> => {
      // validación
      if (!mensaje.trim()) {
        toast.error('El mensaje no puede estar vacío')
        return false
      }

      try {
        setLoading(true)

        const nuevoMensaje: MensajeIncidencia = {
          idIncidencia: incidencia.id,
          idUsuario,
          mensaje: mensaje.trim(),
          fecha: new Date().toISOString(),
        }

        // guardar mensaje
        await createMensaje(nuevoMensaje)

        // notificación
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

  return {
    enviarMensaje,
    loading,
  }
}
