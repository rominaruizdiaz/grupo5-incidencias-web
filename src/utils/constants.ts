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
  [IncidenciaUrgencia.BAJA]: 'bg-yellow-950 text-yellow-200',
  [IncidenciaUrgencia.MEDIA]: 'bg-orange-950 text-orange-200',
  [IncidenciaUrgencia.ALTA]: 'bg-red-950 text-red-200',
}

// ESTADO
export const COLOR_ESTADO = {
  [IncidenciaEstado.ACTIVO]: 'bg-sky-950 text-sky-200',
  [IncidenciaEstado.EN_CURSO]: 'bg-violet-950 text-violet-200',
  [IncidenciaEstado.RESUELTO]: 'bg-emerald-950 text-emerald-200',
}
