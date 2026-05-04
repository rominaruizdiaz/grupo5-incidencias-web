import { useState } from 'react'
import { Menu, ChevronLeft, User } from 'lucide-react'

import { useNotificacionesStore } from '@/store/notification.store'
import { useNotificationsPolling } from '@/hooks/notificaciones/useNotificationsPolling'
import { useFilteredNavItems } from '@/hooks/navegacion/useFilteredNavItems'
import { NavItem } from './NavItem'

export const SideNav = () => {
  const sinLeer = useNotificacionesStore(state => state.sinLeer)
  const [collapsed, setCollapsed] = useState(false)

  // actualización de las notificaciones
  useNotificationsPolling()

  const items = useFilteredNavItems('desktop')

  const base = `flex items-center gap-3 rounded-xl transition
    mx-2 px-3 py-2
    ${collapsed ? 'justify-center px-0' : ''}`

  const active = 'bg-blue-100 text-blue-700 shadow-sm'
  const inactive = 'text-gray-600 hover:bg-gray-100'

  return (
    <aside
      className={`
        hidden md:flex flex-col
        bg-white border-r border-gray-200
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="font-bold text-lg">Incidencias</span>}

        <button onClick={() => setCollapsed(v => !v)}>
          {collapsed ? <Menu /> : <ChevronLeft />}
        </button>
      </div>

      {/* LINKS */}
      <nav className="flex-1 flex flex-col gap-1">
        {items.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            label={collapsed ? '' : item.label}
            icon={item.icon}
            baseClass={base}
            activeClass={active}
            inactiveClass={inactive}
            badgeCount={item.hasBadge ? sinLeer : undefined}
          />
        ))}
      </nav>

      {/* PERFIL */}
      <div className="border-t border-gray-200 p-2 mt-auto">
        <NavItem
          to="/userProfile"
          label={collapsed ? '' : 'Perfil'}
          icon={User}
          baseClass={base}
          activeClass={active}
          inactiveClass={inactive}
        />
      </div>
    </aside>
  )
}
