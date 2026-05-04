import { create } from 'zustand'
import {
  getNotificacionesPorUsuario,
  marcarComoLeida,
  marcarTodasComoLeidas,
} from '@/services/notificaciones'

import type { NotifStore } from './notification.types'

export const useNotificacionesStore = create<NotifStore>((set, get) => ({
  notificaciones: [],
  sinLeer: 0,
  loading: false,

  refresh: async userId => {
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

  markAsRead: async id => {
    await marcarComoLeida(id)

    const updated = get().notificaciones.map(n =>
      n.id === id ? { ...n, leida: true } : n
    )

    set({
      notificaciones: updated,
      sinLeer: updated.filter(n => !n.leida).length,
    })
  },

  markAllAsRead: async userId => {
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
