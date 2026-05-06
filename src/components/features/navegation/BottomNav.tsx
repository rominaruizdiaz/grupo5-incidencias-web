import { useNotificacionesStore } from '@/store/notification.store'
import { useNotificationsPolling } from '@/hooks/notificaciones/useNotificationsPolling'
import { NavItem } from './NavItem'
import { useFilteredNavItems } from '@/hooks/navegacion/useFilteredNavItems'

export const BottomNav = () => {
  const sinLeer = useNotificacionesStore(state => state.sinLeer)

  // actualización de las notificaciones
  useNotificationsPolling()

  const items = useFilteredNavItems('mobile')

  const base =
    'flex-1 flex flex-col items-center justify-center py-3 text-xs relative'

  const active = 'text-blue-600'
  const inactive = 'text-gray-500'

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t flex md:hidden">
      {items.map(item => (
        <NavItem
          key={item.to}
          to={item.to}
          label={item.label}
          icon={item.icon}
          baseClass={base}
          activeClass={active}
          inactiveClass={inactive}
          badgeCount={item.hasBadge ? sinLeer : undefined}
        />
      ))}
    </nav>
  )
}
