import { IncidenciaEstado, IncidenciaUrgencia, UserRole } from '@/types'

// ROLES
export const ROLES = {
  [UserRole.ADMIN]: 'Administración',
  [UserRole.PROFESOR]: 'Profesorado',
  [UserRole.TECNICO]: 'Técnico/Mantenimiento',
}

// CATEGORÍAS (basadas en etiquetas)
export const CATEGORIAS_DEFECTO = [
  'Hardware',
  'Software',
  'Red',
  'Otro',
]

// URGENCIA
export const COLOR_URGENCIA = {
  [IncidenciaUrgencia.BAJA]: 'bg-yellow-100 text-yellow-800',
  [IncidenciaUrgencia.MEDIA]: 'bg-orange-100 text-orange-800',
  [IncidenciaUrgencia.ALTA]: 'bg-red-100 text-red-800',
}

// ESTADO
export const COLOR_ESTADO = {
  [IncidenciaEstado.ACTIVO]: 'bg-blue-100 text-blue-800',
  [IncidenciaEstado.EN_CURSO]: 'bg-purple-100 text-purple-800',
  [IncidenciaEstado.RESUELTO]: 'bg-green-100 text-green-800',
}
