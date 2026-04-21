import { NavLink } from 'react-router-dom'

export const BottomNav = () => {
  const base = 'flex-1 text-center py-3 text-sm'
  const active = 'text-blue-600'
  const inactive = 'text-gray-500'

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t flex md:hidden">
      <NavLink
        to="/panel"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        Panel
      </NavLink>

      <NavLink
        to="/createIncidencia"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        Crear
      </NavLink>

      <NavLink
        to="/userProfile"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        Perfil
      </NavLink>
    </nav>
  )
}
