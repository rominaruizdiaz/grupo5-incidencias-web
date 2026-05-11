import { createMensaje } from './mensajes'

import type { Usuario } from '@/types'

export const crearMensajeTracking = async (
  idIncidencia: number,
  usuario: Usuario,
  accion: string
) => {
  try {
    await createMensaje({
      idIncidencia,
      idUsuario: usuario.id,
      mensaje: accion,
      fecha: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Error creando mensaje de tracking:', err)
  }
}

export const mensajesCambioEstado = {
  aActivo: (nombreUsuario: string) =>
    `${nombreUsuario} cambió el estado a: Activo`,
  aEnCurso: (nombreUsuario: string) =>
    `${nombreUsuario} cambió el estado a: En curso`,
  aResuelto: (nombreUsuario: string) =>
    `${nombreUsuario} cambió el estado a: Resuelto`,
}

export const mensajesResolucion = {
  resuelto: (nombreUsuario: string, descripcion?: string) =>
    `${nombreUsuario} marcó como resuelto: ${descripcion || 'Sin descripción'}`,
  reabierto: (nombreUsuario: string, nuevoEstado: string) =>
    `${nombreUsuario} reabrió la incidencia con estado: ${nuevoEstado}`,
}
