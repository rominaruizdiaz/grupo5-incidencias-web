import { NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getNotificacionesPorUsuario } from '@/services/notificaciones'
import { useEffect, useState } from 'react'
import { Bell, BarChart3 } from 'lucide-react'
import '@/styles/TopNav.css'

export const TopNav = () => {
  const usuario = useAuthStore(state => state.usuario)
  const isAdmin = usuario?.rol === 1
  const [notificacionesSinLeer, setNotificacionesSinLeer] = useState(0)

  useEffect(() => {
    const fetchNotificaciones = async () => {
      if (!usuario) return
      try {
        const data = await getNotificacionesPorUsuario(usuario.id)
        const sinLeer = data.filter(n => !n.leida).length
        setNotificacionesSinLeer(sinLeer)
      } catch (err) {
        console.error('Error cargando notificaciones:', err)
      }
    }

    fetchNotificaciones()
    const interval = setInterval(fetchNotificaciones, 30000)
    return () => clearInterval(interval)
  }, [usuario])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-blue-400 font-semibold'
      : 'text-slate-400 hover:text-slate-100'

  return (
    <nav className="nav-container">
      <div className="font-bold text-lg">Incidencias App</div>

      <div className="flex flex-wrap gap-4 items-center">
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

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-slate-100'
            }`
          }
        >
          <BarChart3 size={20} />
          <span>Estadísticas</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-2 relative ${
              isActive
                ? 'text-blue-400 font-semibold'
                : 'text-slate-400 hover:text-slate-100'
            }`
          }
        >
          <Bell size={20} />
          {notificacionesSinLeer > 0 && (
            <span className="nav-notification-badge">
              {notificacionesSinLeer}
            </span>
          )}
        </NavLink>

        <NavLink to="/userProfile" className={linkClass}>
          Perfil
        </NavLink>
      </div>
    </nav>
  )
}
