import { useEffect, useMemo, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, IncidenciaUrgencia, type Incidencia } from '@/types'

export type SortType = 'estado' | 'urgencia' | 'fecha'

const estadoPriority: Record<IncidenciaEstado, number> = {
  [IncidenciaEstado.ACTIVO]: 0,
  [IncidenciaEstado.EN_CURSO]: 1,
  [IncidenciaEstado.RESUELTO]: 2,
}

const urgenciaPriority: Record<IncidenciaUrgencia, number> = {
  [IncidenciaUrgencia.ALTA]: 0,
  [IncidenciaUrgencia.MEDIA]: 1,
  [IncidenciaUrgencia.BAJA]: 2,
}

export const useIncidencias = () => {
  const usuario = useAuthStore(state => state.usuario)

  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortType>('estado')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const data = await getIncidencias()

        const normalizadas: Incidencia[] = data.map(i => ({
          ...i,
          fecha: i.fecha ?? new Date().toISOString(),
          estado: i.estado ?? IncidenciaEstado.ACTIVO,
          urgencia: i.urgencia ?? IncidenciaUrgencia.MEDIA,
          idReporta: i.idReporta ?? null,
          idAsignado: i.idAsignado ?? null,
          fechaResolucion: i.fechaResolucion ?? null,
        }))

        setIncidencias(normalizadas)
      } catch {
        setError('Error al cargar incidencias')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // FILTRADO POR EL ROL
  const filteredIncidencias = useMemo(() => {
    if (!usuario) return []

    switch (usuario.rol) {
      case 1: // ADMIN
        return incidencias

      case 2: // PROFESOR
        return incidencias.filter(i => i.idReporta === usuario.id)

      case 3: // TECNICO
        return incidencias.filter(i => i.idAsignado === usuario.id)

      default:
        return []
    }
  }, [incidencias, usuario])

  // ORDENACIÓN
  const sortedIncidencias = useMemo(() => {
    const list = [...filteredIncidencias]

    return list.sort((a, b) => {
      switch (sort) {
        case 'estado':
          return estadoPriority[a.estado] - estadoPriority[b.estado]

        case 'urgencia':
          return urgenciaPriority[a.urgencia] - urgenciaPriority[b.urgencia]

        case 'fecha':
          return (
            new Date(b.fecha ?? 0).getTime() - new Date(a.fecha ?? 0).getTime()
          )

        default:
          return 0
      }
    })
  }, [filteredIncidencias, sort])

  // ACTIONS
  const changeSort = (type: SortType) => {
    setSort(type)
  }

  const refresh = async () => {
    try {
      setLoading(true)

      const data = await getIncidencias()

      const normalizadas: Incidencia[] = data.map(i => ({
        ...i,
        fecha: i.fecha ?? new Date().toISOString(),
        estado: i.estado ?? IncidenciaEstado.ACTIVO,
        urgencia: i.urgencia ?? IncidenciaUrgencia.MEDIA,
        idReporta: i.idReporta ?? null,
        idAsignado: i.idAsignado ?? null,
        fechaResolucion: i.fechaResolucion ?? null,
      }))

      setIncidencias(normalizadas)
    } catch {
      setError('Error al refrescar incidencias')
    } finally {
      setLoading(false)
    }
  }

  return {
    incidencias: sortedIncidencias,
    loading,
    error,
    sort,
    changeSort,
    refresh,
  }
}
