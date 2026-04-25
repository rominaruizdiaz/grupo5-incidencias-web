import api from './api'
import type { Usuario } from '@/types'

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get('/users')
  return data
}

// Obtener usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
  const { data } = await api.get(`/users/${id}`)
  return data
}

// Actualizar usuario
export const updateUsuario = async (id: number, usuario: Usuario) => {
  const { data } = await api.patch(`/users/${id}`, usuario)
  return data
}

// Eliminar usuario
export const deleteUsuario = async (id: number) => {
  const { data } = await api.delete(`/users/${id}`)
  return data
}
