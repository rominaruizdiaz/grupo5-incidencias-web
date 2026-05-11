import type { Incidencia, Usuario } from '@/types'
import { NotificationEvent } from './notification.events'

export const resolveDestinatarios = (
  event: NotificationEvent,
  incidencia: Incidencia,
  usuarios: Usuario[]
): Usuario[] => {
  switch (event) {
    case NotificationEvent.MENSAJE_NUEVO:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.CAMBIO_ESTADO:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.ASIGNACION:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.RESOLUCION:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.REABRIR:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.BORRADO:
      return usuarios.filter(
        u =>
          u.rol === 1 || // admin
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    case NotificationEvent.CAMBIO_CAMPOS:
      return usuarios.filter(
        u =>
          u.id === incidencia.idUsuarioReporta ||
          u.id === incidencia.idUsuarioAsignado
      )

    default:
      return []
  }
}
