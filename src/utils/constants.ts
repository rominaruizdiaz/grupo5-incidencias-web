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
    'bg-fuchsia-600 text-white border-fuchsia-500 dark:bg-fuchsia-500 dark:text-white',

  [IncidenciaUrgencia.MEDIA]:
    'bg-amber-600 text-white border-amber-500 dark:bg-amber-500 dark:text-white',

  [IncidenciaUrgencia.BAJA]:
    'bg-cyan-600 text-white border-cyan-500 dark:bg-cyan-500 dark:text-white',
}

// COLORES ESTADO (ACTIVO, EN CURSO, RESUELTO)
export const COLOR_ESTADO = {
  [IncidenciaEstado.ACTIVO]:
    'bg-red-600 text-white border-red-500 dark:bg-red-500 dark:text-white',

  [IncidenciaEstado.EN_CURSO]:
    'bg-orange-600 text-white border-orange-500 dark:bg-orange-500 dark:text-white',

  [IncidenciaEstado.RESUELTO]:
    'bg-green-600 text-white border-green-500 dark:bg-green-500 dark:text-white',
}
