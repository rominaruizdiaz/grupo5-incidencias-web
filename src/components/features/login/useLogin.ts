import { useState } from 'react'

import type { LoginFormData } from './login.types'
import { setUsuario, setLoading } from '@/store/auth.selectors'
import { loginRequest } from '@/services/auth'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [loading, setLoadingLocal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setEmail = (email: string) => setForm(prev => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm(prev => ({ ...prev, password }))

  const login = async () => {
    try {
      setLoadingLocal(true)
      setLoading(true)
      setError(null)

      const res = await loginRequest({
        email: form.email,
        password: form.password,
      })

      setUsuario(res.user)
      localStorage.setItem('token', res.token)

      navigate('/panel')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoadingLocal(false)
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
