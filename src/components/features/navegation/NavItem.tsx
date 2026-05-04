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
        `${baseClass} ${isActive ? activeClass : inactiveClass}`
      }
    >
      <div className="relative flex flex-col items-center justify-center">
        <Icon size={20} />
        {badgeCount !== undefined && <NotificationBadge count={badgeCount} />}
      </div>

      <span className="hidden md:block">{label}</span>
    </NavLink>
  )
}
