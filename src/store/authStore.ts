import { UserRole, type Usuario } from '@/types'
import { create } from 'zustand'

interface AuthStore {
  usuario: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean

  // funciones que cambian el estado
  setUsuario: (usuario: Usuario | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void

  // lógica de permisos
  hasRole: (role: UserRole) => boolean
  isAdmin: () => boolean
  isProfesor: () => boolean
  isTecnico: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  usuario: null,
  isAuthenticated: false,
  isLoading: true,

  setUsuario: usuario => {
    set({
      usuario,
      isAuthenticated: !!usuario,
    })
  },

  setLoading: loading => {
    set({ isLoading: loading })
  },

  logout: () => {
    localStorage.removeItem('usuarioId')
    set({
      usuario: null,
      isAuthenticated: false,
    })
  },

  hasRole: role => {
    const { usuario } = get()
    return usuario?.rol === role
  },

  isAdmin: () => {
    const { usuario } = get()
    return usuario?.rol === UserRole.ADMIN
  },

  isProfesor: () => {
    const { usuario } = get()
    return usuario?.rol === UserRole.PROFESOR
  },

  isTecnico: () => {
    const { usuario } = get()
    return usuario?.rol === UserRole.TECNICO
  },
}))
