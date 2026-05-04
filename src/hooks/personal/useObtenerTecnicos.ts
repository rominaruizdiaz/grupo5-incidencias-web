import { useEffect, useState, useCallback } from 'react'
import { getUsuarios } from '@/services/personal'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'
import type { Usuario } from '@/types'

// conseguir todos los tecnicos que puedan asignarse a una incidencia
export interface TecnicoDisponible extends Usuario {
  especialidades: number[]
}

export const useObtenerTecnicos = () => {
  const [tecnicos, setTecnicos] = useState<TecnicoDisponible[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTecnicos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const usuarios = await getUsuarios()

      // Filtrar solo técnicos
      const tecnicosRol3 = usuarios.filter(u => u.rol === 3)

      // Obtener especialidades de cada técnico
      const tecnicosConEspecialidades = await Promise.all(
        tecnicosRol3.map(async tecnico => {
          const especialidades = await getEtiquetasPorUsuario(tecnico.id)
          return {
            ...tecnico,
            especialidades,
          }
        })
      )

      setTecnicos(tecnicosConEspecialidades)
    } catch (err) {
      console.error('Error cargando técnicos:', err)
      setError('Error al cargar técnicos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTecnicos()
  }, [fetchTecnicos])

  // Filtrar técnicos por especialidad si se proporciona
  const filtrarPorEspecialidad = useCallback(
    (etiquetaId: number) => {
      return tecnicos.filter(t => t.especialidades.includes(etiquetaId))
    },
    [tecnicos]
  )

  return {
    tecnicos,
    loading,
    error,
    filtrarPorEspecialidad,
    refresh: fetchTecnicos,
  }
}
