import { NavLink } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { useEffect } from 'react'
import { Bell, BarChart3, Home, Plus, User } from 'lucide-react'
import { useNotificacionesStore } from '@/store/notification.store'

export const BottomNav = () => {
  const usuario = useAuthStore(state => state.usuario)

  const sinLeer = useNotificacionesStore(state => state.sinLeer)
  const refresh = useNotificacionesStore(state => state.refresh)

  useEffect(() => {
    if (!usuario) return

    refresh(usuario.id)

    const interval = setInterval(() => {
      refresh(usuario.id)
    }, 30000)

    return () => clearInterval(interval)
  }, [usuario, refresh])

  const base =
    'flex-1 flex flex-col items-center justify-center py-3 text-xs relative'

  const active = 'text-blue-600'
  const inactive = 'text-gray-500'

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t flex md:hidden">
      <NavLink
        to="/panel"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <Home size={20} />
        <span>Inicio</span>
      </NavLink>

      <NavLink
        to="/createIncidencia"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <Plus size={20} />
        <span>Crear</span>
      </NavLink>

      <NavLink
        to="/statistics"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <BarChart3 size={20} />
        <span>Stats</span>
      </NavLink>

      {/* NOTIFICACIONES */}
      <NavLink
        to="/notifications"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <div className="relative">
          <Bell size={20} />

          {sinLeer > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {sinLeer > 9 ? '9+' : sinLeer}
            </span>
          )}
        </div>

        <span>Avisos</span>
      </NavLink>

      <NavLink
        to="/userProfile"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <User size={20} />
        <span>Perfil</span>
      </NavLink>
    </nav>
  )
}
