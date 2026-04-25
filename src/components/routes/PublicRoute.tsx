import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const usuario = useAuthStore(state => state.usuario)
  const token = localStorage.getItem('token')

  if (usuario || token) {
    return <Navigate to="/panel" replace />
  }

  return children
}
