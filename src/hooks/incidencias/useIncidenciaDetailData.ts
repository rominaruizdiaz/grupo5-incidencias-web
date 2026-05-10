import { useState, useEffect } from 'react'
import { getIncidenciaById } from '@/services/incidencias'
import { getEtiquetas } from '@/services/etiquetas'
import { getDepartamentos } from '@/services/departamentos'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'
import type { Departamento, Incidencia } from '@/types'

interface DetailDataState {
  incidenciaDirecta: Incidencia | null
  etiquetaActual: any
  etiquetasUsuario: number[]
  etiquetas: any[]
  departamentos: Departamento[]
  loading: boolean
  loadEtiquetaActual: () => Promise<void>
}

export const useIncidenciaDetailData = (
  incidenciaId: number,
  incidencia: Incidencia | null,
  usuarioId: number | undefined,
  usuarioRol: number | undefined
): DetailDataState => {
  const [incidenciaDirecta, setIncidenciaDirecta] = useState<Incidencia | null>(
    null
  )
  const [etiquetaActual, setEtiquetaActual] = useState<any>(null)
  const [etiquetasUsuario, setEtiquetasUsuario] = useState<number[]>([])
  const [etiquetas, setEtiquetas] = useState<any[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loading, setLoading] = useState(false)

  // Cargar incidencia si no está en lista
  useEffect(() => {
    if (!incidencia && incidenciaId) {
      const fetchIncidencia = async () => {
        try {
          const data = await getIncidenciaById(incidenciaId)
          if (data) {
            setIncidenciaDirecta(data)
          }
        } catch (err) {
          console.error('Error cargando incidencia:', err)
        }
      }
      fetchIncidencia()
    }
  }, [incidenciaId, incidencia])

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true)
      try {
        const etiquetasData = await getEtiquetas()
        setEtiquetas(etiquetasData)

        if (usuarioId && usuarioRol === 3) {
          const etiquetasDelUsuario = await getEtiquetasPorUsuario(usuarioId)
          setEtiquetasUsuario(etiquetasDelUsuario)
        }

        const departamentosData = await getDepartamentos()
        setDepartamentos(departamentosData)
      } catch (err) {
        console.error('Error cargando datos:', err)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [usuarioId, usuarioRol])

  // Obtener etiqueta actual basada en la categoría
  const loadEtiquetaActual = async () => {
    if (incidencia?.categoria) {
      try {
        const etiquetasData = await getEtiquetas()
        const encontrada = etiquetasData.find(
          e => e.nombre === incidencia.categoria
        )
        setEtiquetaActual(encontrada || null)
      } catch (err) {
        console.error('Error cargando etiqueta:', err)
      }
    }
  }

  return {
    incidenciaDirecta,
    etiquetaActual,
    etiquetasUsuario,
    etiquetas,
    departamentos,
    loading,
    loadEtiquetaActual,
  }
}
