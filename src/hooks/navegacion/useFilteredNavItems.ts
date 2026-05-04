import { useMemo } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { NAV_ITEMS } from '@/config/NavItems'

// devuelve al usuario la navegacion correspondiente a su rol
export const useFilteredNavItems = (device: 'mobile' | 'desktop') => {
  const usuario = useAuthStore(state => state.usuario)

  return useMemo(() => {
    const isAdmin = usuario?.rol === 1

    return NAV_ITEMS.filter(item => {
      const visible = item.showOn.includes(device)
      if (!visible) return false

      if (item.adminOnly && !isAdmin) return false
      if (item.userOnly && isAdmin) return false

      return true
    })
  }, [usuario, device])
}
