import { IncidenciaEstado, IncidenciaUrgencia, UserRole } from '@/types'

// ROLES
export const ROLES = {
  [UserRole.ADMIN]: 'Administración',
  [UserRole.PROFESOR]: 'Profesorado',
  [UserRole.TECNICO]: 'Técnico/Mantenimiento',
}

// CATEGORÍAS (basadas en etiquetas)
export const CATEGORIAS_DEFECTO = ['Hardware', 'Software', 'Red', 'Otro']

// COLORES PRIORIDAD (ALTO, MEDIO, BAJO)
export const COLOR_URGENCIA = {
  [IncidenciaUrgencia.ALTA]:
    'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-500',

  [IncidenciaUrgencia.MEDIA]: 'bg-amber-500/10 border-amber-500 text-amber-500',

  [IncidenciaUrgencia.BAJA]: 'bg-cyan-500/10 border-cyan-500 text-cyan-500',
}

// COLORES ESTADO (ACTIVO, EN CURSO, RESUELTO)
export const COLOR_ESTADO = {
  [IncidenciaEstado.ACTIVO]: 'bg-sky-500/10 border-sky-500 text-sky-500',

  [IncidenciaEstado.EN_CURSO]:
    'bg-amber-500/10 border-amber-500 text-amber-500',

  [IncidenciaEstado.RESUELTO]:
    'bg-emerald-500/10 border-emerald-500 text-emerald-500',
}
