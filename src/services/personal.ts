import api from './api'
import type { Usuario } from '@/types'

// Obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  const { data } = await api.get('/usuarios')
  return data
}

// Obtener usuario por ID
export const getUsuarioById = async (id: number): Promise<Usuario> => {
  const { data } = await api.get(`/usuarios/${id}`)
  return data
}

// Actualizar usuario
export const updateUsuario = async (id: number, usuario: Partial<Usuario>) => {
  const { data } = await api.patch(`/usuarios/${id}`, usuario)
  return data
}

// Eliminar usuario
export const deleteUsuario = async (id: number) => {
  const { data } = await api.delete(`/usuarios/${id}`)
  return data
}
