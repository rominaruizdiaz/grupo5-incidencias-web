import { useEffect, useMemo, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, IncidenciaUrgencia, type Incidencia } from '@/types'
import { getUsuarios } from '@/services/personal'
import type { Usuario } from '@/types'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'
import { getEtiquetas } from '@/services/etiquetas'
import { getDepartamentos } from '@/services/departamentos'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'

import { getNombreUsuario as resolveNombre } from '@/utils/usuarios'

// filtros de las incidencias según el user

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
  const [etiquetas, setEtiquetas] = useState<any[]>([])
  const [departamentos, setDepartamentos] = useState<any[]>([])
  const [usuarioDepartamentos, setUsuarioDepartamentos] = useState<any[]>([])
  const [usuarioEtiquetasIds, setUsuarioEtiquetasIds] = useState<number[]>([])

  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortType>('estado')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [
          incidenciasData,
          usuariosData,
          etiquetasData,
          departamentosData,
          usuarioDepartamentosData,
        ] = await Promise.all([
          getIncidencias(),
          getUsuarios(),
          getEtiquetas(),
          getDepartamentos(),
          getUsuarioDepartamentos(),
        ])

        setUsuarios(usuariosData)
        setEtiquetas(etiquetasData)
        setDepartamentos(departamentosData)
        setUsuarioDepartamentos(usuarioDepartamentosData)

        if (usuario && usuario.rol === 3) {
          const etiquetasIds = await getEtiquetasPorUsuario(usuario.id)
          setUsuarioEtiquetasIds(etiquetasIds)
        }

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
  }, [usuario])

  const getNombreUsuario = (id?: number | null) => resolveNombre(usuarios, id)

  const filteredIncidencias = useMemo(() => {
    if (!usuario) return []

    switch (usuario.rol) {
      case 1:
        return incidencias
      // filtros del profesor
      case 2:
        return incidencias.filter(i => i.idUsuarioReporta === usuario.id)
      // filtros del tecnico
      case 3: {
        const misDepartamentos = usuarioDepartamentos
          .filter(ud => ud.usuarioId === usuario.id)
          .map(ud => {
            const depto = departamentos.find(d => d.id === ud.departamentoId)
            return depto?.nombre
          })
          .filter(Boolean)

        const misEtiquetas = usuarioEtiquetasIds
          .map(etqId => {
            const etq = etiquetas.find(e => e.id === etqId)
            return etq?.nombre
          })
          .filter(Boolean)

        // incidencias asignadas o creadas por el user
        const asignadas = incidencias.filter(
          i =>
            i.idUsuarioAsignado === usuario.id ||
            i.idUsuarioReporta === usuario.id
        )

        // incidencias por especialidad y departamento
        const porEspecialidad = incidencias.filter(
          i =>
            misDepartamentos.includes(i.ubicacion) &&
            misEtiquetas.includes(i.categoria)
        )

        return [
          ...new Map(
            [...asignadas, ...porEspecialidad].map(i => [i.id, i])
          ).values(),
        ]
      }
      default:
        return []
    }
  }, [
    incidencias,
    usuario,
    usuarioDepartamentos,
    departamentos,
    usuarioEtiquetasIds,
    etiquetas,
  ])

  // opciones de orden de las incidencias
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

  // cambiar orden
  const changeSort = (type: SortType) => setSort(type)

  const refresh = async () => {
    const [
      incidenciasData,
      usuariosData,
      etiquetasData,
      departamentosData,
      usuarioDepartamentosData,
    ] = await Promise.all([
      getIncidencias(),
      getUsuarios(),
      getEtiquetas(),
      getDepartamentos(),
      getUsuarioDepartamentos(),
    ])

    setUsuarios(usuariosData)
    setEtiquetas(etiquetasData)
    setDepartamentos(departamentosData)
    setUsuarioDepartamentos(usuarioDepartamentosData)

    if (usuario && usuario.rol === 3) {
      const etiquetasIds = await getEtiquetasPorUsuario(usuario.id)
      setUsuarioEtiquetasIds(etiquetasIds)
    }

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
