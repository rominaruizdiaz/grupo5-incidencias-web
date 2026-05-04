import { IncidenciaEstado } from '@/types'
import { mensajesCambioEstado } from '@/services/tracking'

// mensajes del cambio de estado de las incidencias
export const ESTADO_TRACKING_MAP = {
  [IncidenciaEstado.ACTIVO]: {
    mensaje: (nombre: string) => mensajesCambioEstado.aActivo(nombre),
    accion: 'Cambio de estado a Activo',
  },
  [IncidenciaEstado.EN_CURSO]: {
    mensaje: (nombre: string) => mensajesCambioEstado.aEnCurso(nombre),
    accion: 'Cambio de estado a En Curso',
  },
  [IncidenciaEstado.RESUELTO]: {
    mensaje: (nombre: string) => mensajesCambioEstado.aResuelto(nombre),
    accion: 'Cambio de estado a Resuelto',
  },
} as const
