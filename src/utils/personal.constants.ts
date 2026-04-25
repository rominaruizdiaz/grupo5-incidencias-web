import { UserRole } from '@/types'

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.PROFESOR]: 'Profesor',
  [UserRole.TECNICO]: 'Técnico',
}

export const ROLE_COLORS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'bg-red-100 text-red-800',
  [UserRole.PROFESOR]: 'bg-blue-100 text-blue-800',
  [UserRole.TECNICO]: 'bg-green-100 text-green-800',
}

export const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(
  ([value, label]) => ({
    value: Number(value) as UserRole,
    label,
  })
)
