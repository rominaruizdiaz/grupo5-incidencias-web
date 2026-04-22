import type { Usuario } from '@/types'

export const getNombreUsuario = (usuarios: Usuario[], id?: number | null) => {
  if (!id) return 'Desconocido'
  return usuarios.find(u => u.id === id)?.nombre ?? 'Desconocido'
}
