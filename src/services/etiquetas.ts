import api from './api'
import type { Etiqueta } from '@/types'

export const getEtiquetas = async (): Promise<Etiqueta[]> => {
  const { data } = await api.get('/etiquetas')
  return data
}

export const getEtiquetaById = async (id: number): Promise<Etiqueta> => {
  const { data } = await api.get(`/etiquetas/${id}`)
  return data
}

export const createEtiqueta = async (etiqueta: Etiqueta) => {
  const { data } = await api.post('/etiquetas', etiqueta)
  return data
}

export const updateEtiqueta = async (id: number, etiqueta: Partial<Etiqueta>) => {
  const { data } = await api.patch(`/etiquetas/${id}`, etiqueta)
  return data
}

export const deleteEtiqueta = async (id: number) => {
  const { data } = await api.delete(`/etiquetas/${id}`)
  return data
}
