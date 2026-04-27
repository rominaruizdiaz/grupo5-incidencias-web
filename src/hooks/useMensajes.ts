import { useEffect, useState, useCallback } from 'react'
import { getMensajesPorIncidencia } from '@/services/mensajes'
import type { MensajeIncidencia } from '@/types'

export const useMensajes = (idIncidencia: number) => {
  const [mensajes, setMensajes] = useState<MensajeIncidencia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMensajes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getMensajesPorIncidencia(idIncidencia)
      setMensajes(data)
    } catch (err) {
      console.error('Error cargando mensajes:', err)
      setError('Error al cargar mensajes')
    } finally {
      setLoading(false)
    }
  }, [idIncidencia])

  useEffect(() => {
    fetchMensajes()
  }, [fetchMensajes])

  return { mensajes, loading, error, refresh: fetchMensajes }
}
