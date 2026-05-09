import type { Usuario } from '@/types'
import { UserRole } from '@/types'

export interface AuthState {
  usuario: Usuario | null
  isLoading: boolean
  theme: 'light' | 'dark'
}

export interface AuthActions {
  setUsuario: (usuario: Usuario | null) => void
  setLoading: (value: boolean) => void
  logout: () => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void

  hasRole: (role: UserRole) => boolean
  isAdmin: () => boolean
  isProfesor: () => boolean
  isTecnico: () => boolean
}

export type AuthStore = AuthState & AuthActions
