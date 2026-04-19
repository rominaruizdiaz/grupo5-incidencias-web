import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const usuario = useAuthStore(state => state.usuario)

  if (usuario) {
    return <Navigate to="/panel" replace />
  }

  return children
}
