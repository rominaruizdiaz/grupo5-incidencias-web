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
    'flex-1 flex flex-col items-center justify-center py-3 text-xs relative transition-colors'

  const active = 'text-blue-600 dark:text-blue-400'
  const inactive = 'text-slate-500 dark:text-slate-400'

  return (
    <nav
      className="
        fixed bottom-0 left-0 w-full z-50
        border-t border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-950

        flex md:hidden
        shadow-lg shadow-slate-200/40 dark:shadow-black/40
      "
    >
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
