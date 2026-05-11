import { useCallback } from 'react'
import { Incidencia } from '@/types'
import { useAuthStore } from '@/store/auth.store'
import { emitNotification } from '@/services/notification.service'
import { NotificationEvent } from '@/services/notification.events'
import {
  detectIncidenciaChanges,
  formatChangeMessage,
  IncidenciaChange,
} from './useIncidenciaChanges'
import { crearMensajeTracking } from '@/services/tracking'

export const useNotifyIncidenciaChanges = () => {
  const usuario = useAuthStore(state => state.usuario)

  const notifyChanges = useCallback(
    async (
      originalIncidencia: Incidencia | null,
      updatedIncidencia: Incidencia,
      changes: IncidenciaChange[]
    ) => {
      if (!usuario || changes.length === 0) return

      // Enviar notificación por cada cambio
      for (const change of changes) {
        const changeMessage = formatChangeMessage(change, usuario.nombre)

        // Emitir notificación
        await emitNotification({
          event: NotificationEvent.CAMBIO_CAMPOS,
          incidencia: updatedIncidencia,
          titulo: `${change.label} actualizado`,
          mensaje: changeMessage,
          actorId: usuario.id,
        })

        // Registrar en el chat
        await crearMensajeTracking(
          updatedIncidencia.id,
          usuario,
          changeMessage
        )
      }
    },
    [usuario]
  )

  return { notifyChanges }
}
