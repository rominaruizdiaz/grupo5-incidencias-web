import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { UserRole } from '@/types'

type Props = {
  children: React.ReactNode
  roles: UserRole[]
}

export const RoleRoute = ({ children, roles }: Props) => {
  const usuario = useAuthStore(state => state.usuario)

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  if (!roles.includes(usuario.rol as UserRole)) {
    return <Navigate to="/panel" replace />
  }

  return <>{children}</>
}
