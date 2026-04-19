import { useState } from 'react'
import type { LoginFormData } from './login.types'
import { useAuthStore } from '@/store/authStore'
import { loginRequest } from '@/services/auth'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setUsuario = useAuthStore(state => state.setUsuario)

  const setEmail = (email: string) => {
    setForm(prev => ({ ...prev, email }))
  }

  const setPassword = (password: string) => {
    setForm(prev => ({ ...prev, password }))
  }

  const login = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await loginRequest(form.email, form.password)

      setUsuario(response.user)
      localStorage.setItem('token', response.token)

      navigate('/panel')
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return {
    ...form,
    setEmail,
    setPassword,
    login,
    loading,
    error,
  }
}
