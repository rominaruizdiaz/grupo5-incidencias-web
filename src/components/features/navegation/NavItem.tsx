import { NavLink } from 'react-router-dom'
import { NotificationBadge } from './NotificationBadge'

// items de navegación
type Props = {
  to: string
  label: string
  icon: React.ElementType
  baseClass: string
  activeClass: string
  inactiveClass: string
  badgeCount?: number
}

export const NavItem = ({
  to,
  label,
  icon: Icon,
  baseClass,
  activeClass,
  inactiveClass,
  badgeCount,
}: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          ${baseClass}
          ${isActive ? activeClass : inactiveClass}
        `
      }
    >
      {({ isActive }) => (
        <div className="relative flex items-center justify-center gap-1">
          {/* ICON */}
          <div
            className={`
              transition-all duration-200
              ${isActive ? 'scale-110' : 'scale-100'}
            `}
          >
            <Icon size={20} />
          </div>

          {/* BADGE */}
          {badgeCount !== undefined && <NotificationBadge count={badgeCount} />}

          {/* LABEL -> SOLO DESKTOP */}
          <span
            className={`
              hidden md:block
              text-[11px] font-medium
              transition-colors
              ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
              }
            `}
          >
            {label}
          </span>
        </div>
      )}
    </NavLink>
  )
}
