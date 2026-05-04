import { NavLink, type NavLinkProps } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { useEffect, useState } from 'react'
import {
  Home,
  Plus,
  FolderOpen,
  Users,
  Building2,
  BarChart3,
  Bell,
  User,
  Menu,
  ChevronLeft,
} from 'lucide-react'
import { useNotificacionesStore } from '@/store/notification.store'

export const SideNav = () => {
  const usuario = useAuthStore(state => state.usuario)
  const isAdmin = usuario?.rol === 1

  const [collapsed, setCollapsed] = useState(false)

  const sinLeer = useNotificacionesStore(state => state.sinLeer)
  const refresh = useNotificacionesStore(state => state.refresh)

  useEffect(() => {
    if (!usuario) return

    // carga inicial
    refresh(usuario.id)

    const interval = setInterval(() => {
      refresh(usuario.id)
    }, 30000)

    return () => clearInterval(interval)
  }, [usuario, refresh])

  const linkClass: NavLinkProps['className'] = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl transition
     mx-2 px-3 py-2
     ${collapsed ? 'justify-center px-0' : ''}
     ${
       isActive
         ? 'bg-blue-100 text-blue-700 shadow-sm'
         : 'text-gray-600 hover:bg-gray-100'
     }`

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
        <NavLink to="/panel" className={linkClass}>
          <Home size={20} />
          {!collapsed && <span>Panel</span>}
        </NavLink>

        <NavLink to="/createIncidencia" className={linkClass}>
          <Plus size={20} />
          {!collapsed && <span>Crear</span>}
        </NavLink>

        {!isAdmin && (
          <NavLink to="/areas" className={linkClass}>
            <FolderOpen size={20} />
            {!collapsed && <span>Mis Áreas</span>}
          </NavLink>
        )}

        {isAdmin && (
          <>
            <NavLink to="/personal" className={linkClass}>
              <Users size={20} />
              {!collapsed && <span>Personal</span>}
            </NavLink>

            <NavLink to="/departamentos" className={linkClass}>
              <Building2 size={20} />
              {!collapsed && <span>Departamentos</span>}
            </NavLink>
          </>
        )}

        <NavLink to="/statistics" className={linkClass}>
          <BarChart3 size={20} />
          {!collapsed && <span>Estadísticas</span>}
        </NavLink>

        {/* NOTIFICACIONES */}
        <NavLink to="/notifications" className={linkClass}>
          <div className="relative">
            <Bell size={20} />

            {sinLeer > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {sinLeer > 9 ? '9+' : sinLeer}
              </span>
            )}
          </div>

          {!collapsed && <span>Notificaciones</span>}
        </NavLink>
      </nav>

      {/* PERFIL */}
      <div className="border-t border-gray-200 p-2 mt-auto">
        <NavLink
          to="/userProfile"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl transition mx-2 px-3 py-2
             ${collapsed ? 'justify-center px-0' : ''}
             ${
               isActive
                 ? 'bg-blue-100 text-blue-700'
                 : 'text-gray-600 hover:bg-gray-100'
             }`
          }
        >
          <User size={20} />
          {!collapsed && <span>Perfil</span>}
        </NavLink>
      </div>
    </aside>
  )
}
