import api from './api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types'

// LOGIN
export const loginRequest = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const res = await api.post('/login', data)
  return res.data
}

// REGISTER
export const registerRequest = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await api.post('/register', data)
  return res.data
}
