import '../styles/UserProfilePage.css'
import { LogoutButton } from '@/components/features/logout/LogoutButton'
import { useAuthStore } from '@/store/auth.store'
import { Mail, Shield, User } from 'lucide-react'

export const UserProfilePage = () => {
  const usuario = useAuthStore(state => state.usuario)
  const theme = useAuthStore(state => state.theme)
  const toggleTheme = useAuthStore(state => state.toggleTheme)

  if (!usuario) return null

  const getRolLabel = (rol: number) => {
    switch (rol) {
      case 1:
        return 'Dirección'
      case 2:
        return 'Profesorado'
      case 3:
        return 'Mantenimiento'
      default:
        return 'Usuario'
    }
  }

  const getRolColor = (rol: number) => {
    switch (rol) {
      case 1:
        return 'bg-purple-100 text-purple-700'
      case 2:
        return 'bg-blue-100 text-blue-700'
      case 3:
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 py-4 sm:py-6 shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Mi Perfil
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 pb-16 overflow-hidden">
        <div className="bg-white dark:bg-slate-900 w-full h-full max-w-3xl p-6 space-y-6 sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-200 dark:sm:border-slate-700 sm:p-8 flex flex-col">
          {/* AVATAR + NOMBRE */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User size={36} className="text-white sm:w-12 sm:h-12" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              {usuario.nombre}
            </h2>
          </div>

          {/* INFO */}
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
            {/* EMAIL */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Correo
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1 truncate">
                    {usuario.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ROL */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Rol
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getRolColor(usuario.rol)}`}
                    >
                      {getRolLabel(usuario.rol)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FECHA */}
            {usuario.fechaRegistro && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 sm:col-span-2">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Miembro desde
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  {new Date(usuario.fechaRegistro).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wide">
                Tema
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                Activar modo oscuro
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors dark:bg-slate-700 border border-blue-500" />
              <span className="absolute left-1 top-1 bg-white border border-blue-500 rounded-full h-4 w-4 transition-transform peer-checked:translate-x-5 dark:border-blue-400" />
            </label>
          </div>

          {/* LOGOUT */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-end">
            <div className="w-full flex justify-end">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
