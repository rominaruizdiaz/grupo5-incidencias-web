import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useNotificacionesStore } from '@/store/notification.store'

// actualiza los sin leer de las notificaciones
export const useNotificationsPolling = () => {
  const usuario = useAuthStore(state => state.usuario)
  const refresh = useNotificacionesStore(state => state.refresh)

  useEffect(() => {
    if (!usuario) return

    refresh(usuario.id)

    const interval = setInterval(() => {
      refresh(usuario.id)
    }, 30000)

    return () => clearInterval(interval)
  }, [usuario, refresh])
}
