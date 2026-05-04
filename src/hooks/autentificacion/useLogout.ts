import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

// gestiona el logout del usuario
export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    // limpia la sesión en memoria
    logout()
    navigate('/login', { replace: true })
  }

  return { handleLogout }
}
