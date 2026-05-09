import api from './api'
import type { Departamento } from '@/types'

const dispatchDepartamentosUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('departamentosUpdated'))
  }
}

export const getDepartamentos = async (): Promise<Departamento[]> => {
  const res = await api.get('/departamentos')
  return res.data
}

export const createDepartamento = async (data: { nombre: string }) => {
  const res = await api.post('/departamentos', data)
  dispatchDepartamentosUpdated()
  return res.data
}

export const updateDepartamento = async (
  id: number,
  data: { nombre: string }
) => {
  const res = await api.put(`/departamentos/${id}`, data)
  dispatchDepartamentosUpdated()
  return res.data
}

export const deleteDepartamento = async (id: number) => {
  const res = await api.delete(`/departamentos/${id}`)
  dispatchDepartamentosUpdated()
  return res.data
}
