import type { Notificacion } from '@/types'

// Estado del store de notificaciones
export type NotifStore = {
  notificaciones: Notificacion[]
  sinLeer: number
  loading: boolean

  // carga inicial de notificaciones del usuario
  refresh: (userId: number) => Promise<void>

  // marca una notificación como leída
  markAsRead: (id: number, userId?: number) => Promise<void>

  // marca todas como leídas
  markAllAsRead: (userId: number) => Promise<void>
}
