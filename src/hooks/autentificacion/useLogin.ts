import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/store/auth.store'
import { loginRequest } from '@/services/auth'
import type { LoginRequest } from '@/types'

// logica del login
export const useLogin = () => {
  const navigate = useNavigate()

  const setUsuario = useAuthStore(state => state.setUsuario)
  const setLoadingGlobal = useAuthStore(state => state.setLoading)

  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setEmail = (email: string) => setForm(prev => ({ ...prev, email }))

  const setPassword = (password: string) =>
    setForm(prev => ({ ...prev, password }))

  const login = async () => {
    if (!form.email || !form.password) {
      setError('Email y contraseña obligatorios')
      return
    }

    try {
      setLoading(true)
      setLoadingGlobal(true)
      setError(null)

      const res = await loginRequest(form)

      localStorage.setItem('token', res.accessToken)
      setUsuario(res.user)

      navigate('/panel')
    } catch (err: any) {
      const status = err?.response?.status

      if (status === 400 || status === 401) {
        setError('credenciales inválidas')
        return
      }

      setError('error de conexión con servidor')
    } finally {
      setLoading(false)
      setLoadingGlobal(false)
    }
  }

  return {
    email: form.email,
    password: form.password,
    setEmail,
    setPassword,
    login,
    loading,
    error,
  }
}
