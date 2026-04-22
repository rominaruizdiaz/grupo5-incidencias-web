import api from './api'
import type { LoginRequest, RegisterRequest } from '@/types'

// LOGIN
export const loginRequest = async (data: LoginRequest) => {
  const res = await api.post('/login', data)

  return {
    token: res.data.accessToken,
    user: res.data.user,
  }
}

// REGISTER
export const registerRequest = async (data: RegisterRequest) => {
  const res = await api.post('/register', data)

  return {
    token: res.data.accessToken,
    user: res.data.user,
  }
}
