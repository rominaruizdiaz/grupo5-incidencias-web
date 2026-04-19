import axios, { type AxiosInstance } from 'axios'

//configuración de axios
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
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Interceptor para el manejo de errores globales
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
