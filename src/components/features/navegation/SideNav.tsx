import { useState } from 'react'
import { Menu, ChevronLeft } from 'lucide-react'

import { useNotificacionesStore } from '@/store/notification.store'
import { useNotificationsPolling } from '@/hooks/notificaciones/useNotificationsPolling'
import { useFilteredNavItems } from '@/hooks/navegacion/useFilteredNavItems'
import { NavItem } from './NavItem'

export const SideNav = () => {
  const sinLeer = useNotificacionesStore(state => state.sinLeer)
  const [collapsed, setCollapsed] = useState(false)

  useNotificationsPolling()
  const items = useFilteredNavItems('desktop')

  const base = `
    flex items-center gap-3
    rounded-xl transition-all
    mx-2 px-3 py-2
    ${collapsed ? 'justify-center px-0' : 'justify-start'}
  `

  const active = `
    bg-blue-100 text-blue-700
    shadow-sm
    dark:bg-blue-950/40 dark:text-blue-300
  `

  const inactive = `
    text-slate-600 hover:bg-slate-100
    dark:text-slate-400 dark:hover:bg-slate-800
  `

  return (
    <aside
      className={`
        hidden md:flex flex-col
        border-r border-slate-200 bg-white
        dark:border-slate-800 dark:bg-slate-950
        transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && (
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
            Incidencias
          </span>
        )}

        <button
          onClick={() => setCollapsed(v => !v)}
          className="
            flex items-center justify-center
            rounded-lg p-2
            text-slate-600 hover:text-blue-600
            hover:bg-slate-100
            dark:text-slate-400 dark:hover:text-blue-400
            dark:hover:bg-slate-800
            transition
          "
        >
          {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* NAV */}
      <nav className="flex flex-1 flex-col gap-1 py-3">
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
    </aside>
  )
}
