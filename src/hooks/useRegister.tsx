import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { registerRequest } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'
import type { RegisterFormData } from '@/components/features/register/register.types'

export const useRegister = () => {
  const navigate = useNavigate()

  const setUsuario = useAuthStore(state => state.setUsuario)
  const setLoadingGlobal = useAuthStore(state => state.setLoading)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const register = async (data: RegisterFormData) => {
    try {
      setLoading(true)
      setLoadingGlobal(true)
      setError(null)

      const res = await registerRequest({
        nombre: data.nombre,
        email: data.email,
        password: data.password,
      })

      setUsuario({
        ...res.user,
      })

      localStorage.setItem('token', res.token)

      navigate('/panel')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error en registro')
    } finally {
      setLoading(false)
      setLoadingGlobal(false)
    }
  }

  return {
    register,
    loading,
    error,
  }
}
