import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

      const res = await registerRequest(data)

      localStorage.setItem('token', res.accessToken)
      setUsuario(res.user)

      navigate('/panel')
    } catch (err: any) {
      setError(err?.message || 'Error en registro')
    } finally {
      setLoading(false)
      setLoadingGlobal(false)
    }
  }

  return { register, loading, error }
}
