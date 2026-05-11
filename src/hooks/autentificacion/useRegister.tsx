import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '@/services/api'
import { registerRequest } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'
import type { RegisterRequest } from '@/types'

// logica del register que crea un usuario nuevo
export const useRegister = () => {
  const navigate = useNavigate()

  const setUsuario = useAuthStore(state => state.setUsuario)
  const setLoadingGlobal = useAuthStore(state => state.setLoading)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true)
      setLoadingGlobal(true)
      setError(null)

      const checkEmail = await api.get(`/users?email=${data.email}`)

      if (checkEmail.data.length > 0) {
        setError('EMAIL_EXISTS')
        return
      }

      const res = await registerRequest(data)

      if (!res?.user?.id) {
        throw new Error('USER_ID_MISSING')
      }

      localStorage.setItem('token', res.accessToken)

      setUsuario({
        ...res.user,
        nombre: data.nombre,
      })

      navigate('/panel')
    } catch (err) {
      setError('SERVER_ERROR')
    } finally {
      setLoading(false)
      setLoadingGlobal(false)
    }
  }

  return { register, loading, error }
}
