import '../styles/UserProfilePage.css'
import { LogoutButton } from '@/components/features/logout/LogoutButton'
import { useAuthStore } from '@/store/auth.store'

export const UserProfilePage = () => {
  const usuario = useAuthStore(state => state.usuario)

  if (!usuario) return null

  const initials = usuario.nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(name => name[0].toUpperCase())
    .join('')

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-card">
          <h2 className="page-title">Perfil</h2>

          <div className="profile-avatar-wrapper mb-6">
            {usuario.fotoPerfil ? (
              <img
                src={usuario.fotoPerfil}
                alt={`${usuario.nombre} foto de perfil`}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar profile-avatar-fallback">
                {initials}
              </div>
            )}
          </div>

          <div className="space-y-2 mb-6 page-text">
            <p>{usuario.nombre}</p>
            <p>{usuario.email}</p>
          </div>

          <div className="page-actions">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}
