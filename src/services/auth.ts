import api from './api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types'

// usa axios para realizar el login, logout y registro
// LOGIN
export const loginRequest = async (data: LoginRequest) => {
  const { data: response } = await api.post<AuthResponse>('/login', data)
  return response
}

// REGISTER
export const registerRequest = async (data: RegisterRequest) => {
  const { data: response } = await api.post<AuthResponse>('/register', data)
  return response
}
