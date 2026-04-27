import type { Usuario } from '@/types'

export const getNombreUsuario = (
  usuarios: Usuario[],
  id?: number | string | null
): string => {
  if (id === null || id === undefined) return 'Desconocido'

  const numericId = Number(id)

  const usuario = usuarios.find(u => u.id === numericId)

  return usuario?.nombre ?? 'Desconocido'
}
