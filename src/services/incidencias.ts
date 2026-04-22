import api from './api'
import type { Incidencia, CreateIncidenciaRequest } from '@/types'

// Obtener todas las incidencias
export const getIncidencias = async (): Promise<Incidencia[]> => {
  const { data } = await api.get('/incidencias')
  return data
}

// Obtener incidencia por ID
export const getIncidenciaById = async (id: number): Promise<Incidencia> => {
  const { data } = await api.get(`/incidencias/${id}`)
  return data
}

// Crear incidencia
export const createIncidencia = async (incidencia: CreateIncidenciaRequest) => {
  const { data } = await api.post('/incidencias', incidencia)
  return data
}

// Actualizar estado
export const updateIncidencia = async (
  id: number,
  updates: Partial<Incidencia>
) => {
  const { data } = await api.patch(`/incidencias/${id}`, updates)
  return data
}

// Eliminar incidencia
export const deleteIncidencia = async (id: number) => {
  const { data } = await api.delete(`/incidencias/${id}`)
  return data
}
