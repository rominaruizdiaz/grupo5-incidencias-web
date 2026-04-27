import api from './api'
import type { UsuarioDepartamento } from '@/types'

export const getUsuarioDepartamentos = async (): Promise<UsuarioDepartamento[]> => {
  const { data } = await api.get('/usuarioDepartamento')
  return data
}

export const createUsuarioDepartamento = async (
  data: Omit<UsuarioDepartamento, 'id'>
) => {
  const { data: result } = await api.post('/usuarioDepartamento', data)
  return result
}

export const deleteUsuarioDepartamento = async (id: number) => {
  const { data } = await api.delete(`/usuarioDepartamento/${id}`)
  return data
}

export const getDepartamentosDelUsuario = async (usuarioId: number) => {
  const allRelations = await getUsuarioDepartamentos()
  return allRelations.filter(r => r.usuarioId === usuarioId)
}
