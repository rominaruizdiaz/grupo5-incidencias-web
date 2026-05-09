import { getUsuarios } from '@/services/personal'
import { createNotificacion } from '@/services/notificaciones'
import type { Incidencia } from '@/types'
import { resolveDestinatarios } from './notificaciones.rules'
import { NotificationEvent } from './notification.events'

interface EmitOptions {
  event: NotificationEvent
  incidencia: Incidencia
  mensaje: string
  titulo: string
  actorId?: number
}

export const emitNotification = async ({
  event,
  incidencia,
  mensaje,
  titulo,
  actorId,
}: EmitOptions) => {
  try {
    const usuarios = await getUsuarios()

    const destinatarios = resolveDestinatarios(event, incidencia, usuarios)

    const now = new Date().toISOString()

    await Promise.all(
      destinatarios
        .filter(u => u.id !== actorId)
        .map(u =>
          createNotificacion({
            idUsuarioDestino: u.id,
            titulo,
            mensaje,
            leida: false,
            fechaCreacion: now,
            idIncidenciaVinculada: incidencia.id,
          })
        )
    )
  } catch (err) {
    console.error('Error en notification service:', err)
  }
}
