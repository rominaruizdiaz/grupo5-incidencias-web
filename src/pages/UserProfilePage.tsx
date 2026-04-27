import { LogoutButton } from '@/components/features/logout/LogoutButton'
import { useAuthStore } from '@/store/auth.store'

export const UserProfilePage = () => {
  const usuario = useAuthStore(state => state.usuario)

  if (!usuario) return null

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Perfil</h2>

      <div className="space-y-2 mb-6">
        <p>{usuario.nombre}</p>

        <p>{usuario.email}</p>
      </div>

      <LogoutButton />
    </div>
  )
}
