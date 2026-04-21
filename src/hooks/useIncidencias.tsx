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

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getIncidencias()
        setIncidencias(data)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // FILTRO POR ROL
  const filtered = useMemo(() => {
    if (!usuario) return []

    // ADMIN
    if (usuario.rol === 1) return incidencias

    // PROFESOR
    if (usuario.rol === 2) {
      return incidencias.filter(i => i.idUsuarioReporta === usuario.idUsuario)
    }

    // TÉCNICO
    if (usuario.rol === 3) {
      return incidencias.filter(i => i.idUsuarioAsignado === usuario.idUsuario)
    }

    return []
  }, [incidencias, usuario])

  // ORDENAMIENTO
  const sortedIncidencias = useMemo(() => {
    const list = [...filtered]

    return list.sort((a, b) => {
      if (sort === 'estado') {
        return estadoPriority[a.estado] - estadoPriority[b.estado]
      }

      if (sort === 'urgencia') {
        return urgenciaPriority[a.urgencia] - urgenciaPriority[b.urgencia]
      }

      if (sort === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      }

      return 0
    })
  }, [filtered, sort])

  // ACTIONS
  const changeSort = (type: SortType) => {
    setSort(type)
  }

  return {
    incidencias: sortedIncidencias,
    loading,
    sort,
    changeSort,
  }
}
