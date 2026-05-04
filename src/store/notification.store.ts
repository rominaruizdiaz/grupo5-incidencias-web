import { create } from 'zustand'
import {
  getNotificacionesPorUsuario,
  marcarComoLeida,
  marcarTodasComoLeidas,
} from '@/services/notificaciones'
import type { Notificacion } from '@/types'

type NotifStore = {
  notificaciones: Notificacion[]
  sinLeer: number
  loading: boolean

  refresh: (userId: number) => Promise<void>
  markAsRead: (id: number, userId?: number) => Promise<void>
  markAllAsRead: (userId: number) => Promise<void>
}

export const useNotificacionesStore = create<NotifStore>((set, get) => ({
  notificaciones: [],
  sinLeer: 0,
  loading: false,

  refresh: async (userId: number) => {
    set({ loading: true })

    try {
      const data = await getNotificacionesPorUsuario(userId)

      const ordenadas = data.sort(
        (a, b) =>
          new Date(b.fechaCreacion).getTime() -
          new Date(a.fechaCreacion).getTime()
      )

      set({
        notificaciones: ordenadas,
        sinLeer: ordenadas.filter(n => !n.leida).length,
      })
    } finally {
      set({ loading: false })
    }
  },

  markAsRead: async (id: number, userId?: number) => {
    await marcarComoLeida(id)

    const updated = get().notificaciones.map(n =>
      n.id === id ? { ...n, leida: true } : n
    )

    set({
      notificaciones: updated,
      sinLeer: updated.filter(n => !n.leida).length,
    })
  },

  markAllAsRead: async (userId: number) => {
    if (!userId) return

    await marcarTodasComoLeidas(userId)

    set(state => ({
      notificaciones: state.notificaciones.map(n => ({
        ...n,
        leida: true,
      })),
      sinLeer: 0,
    }))
  },
}))
