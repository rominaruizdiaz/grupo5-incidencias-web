import type { Usuario } from '@/types'
import { UserRole } from '@/types'

export interface AuthState {
  usuario: Usuario | null
  isLoading: boolean
}

export interface AuthActions {
  setUsuario: (usuario: Usuario | null) => void
  setLoading: (value: boolean) => void
  logout: () => void

  hasRole: (role: UserRole) => boolean
  isAdmin: () => boolean
  isProfesor: () => boolean
  isTecnico: () => boolean
}

export type AuthStore = AuthState & AuthActions
