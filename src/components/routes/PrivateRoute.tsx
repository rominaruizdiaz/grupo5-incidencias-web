import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const usuario = useAuthStore(state => state.usuario)

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return children
}
