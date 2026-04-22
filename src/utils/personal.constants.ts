import { UserRole } from '@/types'

export const ROLE_LABELS = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.PROFESOR]: 'Profesor',
  [UserRole.TECNICO]: 'Técnico',
}

export const ROLE_COLORS = {
  [UserRole.ADMIN]: 'bg-red-100 text-red-800',
  [UserRole.PROFESOR]: 'bg-blue-100 text-blue-800',
  [UserRole.TECNICO]: 'bg-green-100 text-green-800',
}

export const ROLE_OPTIONS = [
  { value: UserRole.ADMIN, label: ROLE_LABELS[UserRole.ADMIN] },
  { value: UserRole.PROFESOR, label: ROLE_LABELS[UserRole.PROFESOR] },
  { value: UserRole.TECNICO, label: ROLE_LABELS[UserRole.TECNICO] },
]
