import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export const TopNav = () => {
  const usuario = useAuthStore(state => state.usuario)
  const isAdmin = usuario?.rol === 1

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'text-gray-600 hover:text-gray-900'

  return (
    <nav className="hidden md:flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <div className="font-bold text-lg">Incidencias App</div>

      <div className="flex gap-6">
        <NavLink to="/panel" className={linkClass}>
          Panel
        </NavLink>
        <NavLink to="/createIncidencia" className={linkClass}>
          Crear
        </NavLink>

        {!isAdmin && (
          <NavLink to="/areas" className={linkClass}>
            Mis Áreas
          </NavLink>
        )}

        {isAdmin && (
          <>
            <NavLink to="/personal" className={linkClass}>
              Personal
            </NavLink>
            <NavLink to="/departamentos" className={linkClass}>
              Departamentos
            </NavLink>
          </>
        )}

        <NavLink to="/userProfile" className={linkClass}>
          Perfil
        </NavLink>
      </div>
    </nav>
  )
}
