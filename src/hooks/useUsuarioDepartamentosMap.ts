import { useEffect, useState, useCallback } from 'react'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamento'

export const useUsuarioDepartamentosMap = () => {
  const [mapa, setMapa] = useState<Map<number, number[]>>(new Map())
  const [loading, setLoading] = useState(true)

  // FUNCIÓN PARA REFRESCAR
  const refreshMapa = useCallback(async () => {
    try {
      setLoading(true)

      const asignaciones = await getUsuarioDepartamentos()

      const nuevoMapa = new Map<number, number[]>()

      for (const ud of asignaciones) {
        const userId = ud.usuarioId

        if (!nuevoMapa.has(userId)) {
          nuevoMapa.set(userId, [])
        }

        nuevoMapa.get(userId)!.push(ud.idDepartamento)
      }

      setMapa(nuevoMapa)
    } catch (err) {
      console.error('Error cargando usuarioDepartamento', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Cargar al montar
  useEffect(() => {
    refreshMapa()
  }, [refreshMapa])

  return { mapa, loading, refreshMapa }
}
