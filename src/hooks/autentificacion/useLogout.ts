import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import toast from 'react-hot-toast'

// gestiona el logout del usuario
export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    // limpia la sesión en memoria
    logout()
    toast.success('Sesión cerrada correctamente')
    navigate('/login', { replace: true })
  }

  return { handleLogout }
}
