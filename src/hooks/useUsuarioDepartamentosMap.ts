import { useEffect, useState, useCallback } from 'react'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'

export const useUsuarioDepartamentosMap = () => {
  const [mapa, setMapa] = useState<Map<number, number[]>>(new Map())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMapa = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getUsuarioDepartamentos()
      const newMapa = new Map<number, number[]>()

      data.forEach(ud => {
        const current = newMapa.get(ud.usuarioId) || []
        newMapa.set(ud.usuarioId, [...current, ud.departamentoId])
      })

      setMapa(newMapa)
    } catch {
      setError('Error cargando departamentos de usuarios')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMapa()
  }, [fetchMapa])

  return {
    mapa,
    loading,
    error,
    refreshMapa: fetchMapa,
  }
}
