import { LogoutButton } from '@/components/features/logout/LogoutButton'
import { useAuthStore } from '@/store/auth.store'
import { User, Mail, Shield, LogOut } from 'lucide-react'

export const UserProfilePage = () => {
  const usuario = useAuthStore(state => state.usuario)

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
      </div>

      {/* CONTENIDO */}
      <div className="p-6 max-w-2xl mx-auto">
        {/* FOTO DE PERFIL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          {/* AVATAR */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User size={48} className="text-white" />
            </div>
          </div>

          {/* NOMBRE */}
          <div className="text-center">
            <h2 className="text-2xl font-black text-gray-900">
              {usuario.nombre}
            </h2>
          </div>

          {/* INFO */}
          <div className="space-y-4">
            {/* EMAIL */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Correo
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {usuario.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ROL */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Rol
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRolColor(usuario.rol)}`}
                    >
                      {getRolLabel(usuario.rol)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FECHA DE REGISTRO */}
            {usuario.fechaRegistro && (
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Miembro desde
                  </p>
                  <p className="text-sm font-medium text-gray-900 mt-2">
                    {new Date(usuario.fechaRegistro).toLocaleDateString(
                      'es-ES',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* LOGOUT */}
          <div className="pt-4 border-t border-gray-200">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
