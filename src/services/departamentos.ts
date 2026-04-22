import api from './api'
import type { Departamento } from '@/types'

export const getDepartamentos = async (): Promise<Departamento[]> => {
  const { data } = await api.get('/departamentos')
  return data
}

export const getDepartamentoById = async (
  id: number
): Promise<Departamento> => {
  const { data } = await api.get(`/departamentos/${id}`)
  return data
}

export const createDepartamento = async (departamento: Departamento) => {
  const { data } = await api.post('/departamentos', departamento)
  return data
}

export const updateDepartamento = async (
  id: number,
  departamento: Partial<Departamento>
) => {
  const { data } = await api.patch(`/departamentos/${id}`, departamento)
  return data
}

export const deleteDepartamento = async (id: number) => {
  const { data } = await api.delete(`/departamentos/${id}`)
  return data
}
