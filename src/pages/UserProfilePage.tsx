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
        return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'
      case 2:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'
      case 3:
        return 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300'
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* AVATAR */}
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <User size={44} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
          </div>

          {/* INFO GRID */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* EMAIL */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 dark:text-blue-400" />

                <div className="min-w-0">
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                    Correo
                  </p>
                  <p className="text-sm text-slate-900 dark:text-slate-100 truncate">
                    {usuario.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ROL */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
              <div className="flex items-center gap-3">
                <Shield
                  size={18}
                  className="text-purple-600 dark:text-purple-400"
                />

                <div>
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                    Rol
                  </p>

                  <span
                    className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold border ${getRolColor(
                      usuario.rol
                    )}`}
                  >
                    {getRolLabel(usuario.rol)}
                  </span>
                </div>
              </div>
            </div>

            {/* FECHA */}
            {usuario.fechaRegistro && (
              <div className="sm:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                  Miembro desde
                </p>

                <p className="text-sm text-slate-900 dark:text-slate-100 mt-1">
                  {new Date(usuario.fechaRegistro).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          {/* THEME TOGGLE */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <div>
              <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
                Tema
              </p>
              <p className="text-sm text-slate-900 dark:text-slate-100 mt-1">
                Cambiar apariencia
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />

              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer-checked:bg-blue-600 transition" />

              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </div>

          {/* LOGOUT */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
