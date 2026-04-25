import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return { handleLogout }
}
