import { useCallback, useState } from 'react'
import { createMensaje } from '@/services/mensajes'
import type { MensajeIncidencia, Incidencia } from '@/types'
import toast from 'react-hot-toast'
import { getIncidenciaById } from '@/services/incidencias'
import { useNotificarInvolucrados } from './useNotificarInvolucrados'

export const useEnviarMensaje = () => {
  const [loading, setLoading] = useState(false)
  const { notificarCambio } = useNotificarInvolucrados()

  const enviarMensaje = useCallback(
    async (idIncidencia: number, idUsuario: number, mensaje: string) => {
      if (!mensaje.trim()) {
        toast.error('El mensaje no puede estar vacío')
        return false
      }

      try {
        setLoading(true)

        const ahora = new Date().toISOString()
        const nuevoMensaje: MensajeIncidencia = {
          idIncidencia,
          idUsuario,
          mensaje: mensaje.trim(),
          fecha: ahora,
        }

        await createMensaje(nuevoMensaje)

        // Notify involved parties that a comment was added
        try {
          const incidencia = await getIncidenciaById(idIncidencia)
          await notificarCambio(incidencia, 'Nuevo comentario en la incidencia')
        } catch (err) {
          console.error('Error notificando sobre comentario:', err)
        }

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
