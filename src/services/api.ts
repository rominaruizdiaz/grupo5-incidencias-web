import axios, { type AxiosInstance } from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para agregar el token solo si existe
api.interceptors.request.use(config => {
  const usuarioId = localStorage.getItem('usuarioId')
  if (usuarioId) {
    config.headers['X-Usuario-Id'] = usuarioId
  }
  return config
})

// Interceptor para el manejo de errores globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('usuarioId')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
