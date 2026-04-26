import { useCallback, useState } from 'react'
import { createMensaje } from '@/services/mensajes'
import type { MensajeIncidencia } from '@/types'
import toast from 'react-hot-toast'

export const useEnviarMensaje = () => {
  const [loading, setLoading] = useState(false)

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
    []
  )

  return { enviarMensaje, loading }
}
