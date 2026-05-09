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
      let errorMessage = 'Error en registro'

      // Mapear errores del backend
      const errorText = err?.response?.data?.message || err?.message || ''

      if (errorText.toLowerCase().includes('email') && errorText.toLowerCase().includes('exists')) {
        errorMessage = 'Correo ya registrado'
      } else if (errorText.toLowerCase().includes('email')) {
        errorMessage = 'Error con el correo: ' + errorText
      } else if (errorText.toLowerCase().includes('password')) {
        errorMessage = 'Error con la contraseña: ' + errorText
      } else {
        errorMessage = errorText || 'Error en registro'
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
      setLoadingGlobal(false)
    }
  }

  return { register, loading, error }
}
