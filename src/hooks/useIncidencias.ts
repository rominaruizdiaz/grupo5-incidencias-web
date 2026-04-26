import { useEffect, useMemo, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, IncidenciaUrgencia, type Incidencia } from '@/types'
import { getUsuarios } from '@/services/personal'
import type { Usuario } from '@/types'

import { getNombreUsuario as resolveNombre } from '@/utils/usuarios'

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
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortType>('estado')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [incidenciasData, usuariosData] = await Promise.all([
          getIncidencias(),
          getUsuarios(),
        ])

        setUsuarios(usuariosData)

        setIncidencias(
          incidenciasData.map(i => ({
            ...i,
            fecha: i.fecha ?? new Date().toISOString(),
            estado: i.estado ?? IncidenciaEstado.ACTIVO,
            urgencia: i.urgencia ?? IncidenciaUrgencia.MEDIA,
            idUsuarioReporta: i.idUsuarioReporta ?? null,
            idUsuarioAsignado: i.idUsuarioAsignado ?? null,
            fechaResolucion: i.fechaResolucion ?? null,
          }))
        )
      } catch {
        setError('Error al cargar incidencias')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 👇 wrapper limpio
  const getNombreUsuario = (id?: number | null) => resolveNombre(usuarios, id)

  const filteredIncidencias = useMemo(() => {
    if (!usuario) return []

    switch (usuario.rol) {
      case 1:
        return incidencias
      case 2:
        return incidencias.filter(i => i.idUsuarioReporta === usuario.id)
      case 3:
        return incidencias.filter(i => i.idUsuarioAsignado === usuario.id)
      default:
        return []
    }
  }, [incidencias, usuario])

  const sortedIncidencias = useMemo(() => {
    return [...filteredIncidencias].sort((a, b) => {
      switch (sort) {
        case 'estado':
          return estadoPriority[a.estado] - estadoPriority[b.estado]

        case 'urgencia':
          return urgenciaPriority[a.urgencia] - urgenciaPriority[b.urgencia]

        case 'fecha':
          return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()

        default:
          return 0
      }
    })
  }, [filteredIncidencias, sort])

  const changeSort = (type: SortType) => setSort(type)

  const refresh = async () => {
    const [incidenciasData, usuariosData] = await Promise.all([
      getIncidencias(),
      getUsuarios(),
    ])

    setUsuarios(usuariosData)

    setIncidencias(
      incidenciasData.map(i => ({
        ...i,
        fecha: i.fecha ?? new Date().toISOString(),
        estado: i.estado ?? IncidenciaEstado.ACTIVO,
        urgencia: i.urgencia ?? IncidenciaUrgencia.MEDIA,
      }))
    )
  }

  return {
    incidencias: sortedIncidencias,
    loading,
    error,
    sort,
    changeSort,
    refresh,
    getNombreUsuario,
  }
}
