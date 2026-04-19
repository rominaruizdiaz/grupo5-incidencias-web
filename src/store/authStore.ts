import { UserRole, type Usuario } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  usuario: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean

  // funciones que cambian el estado
  setUsuario: (usuario: Usuario | null) => void
  logout: () => void

  // lógica de permisos
  hasRole: (role: UserRole) => boolean
  isAdmin: () => boolean
  isProfesor: () => boolean
  isTecnico: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      usuario: null,
      isAuthenticated: false,
      isLoading: false,

      setUsuario: usuario => {
        set({
          usuario,
          isAuthenticated: !!usuario,
        })
      },

      logout: () => {
        set({
          usuario: null,
          isAuthenticated: false,
        })
      },

      hasRole: role => get().usuario?.rol === role,
      isAdmin: () => get().usuario?.rol === UserRole.ADMIN,
      isProfesor: () => get().usuario?.rol === UserRole.PROFESOR,
      isTecnico: () => get().usuario?.rol === UserRole.TECNICO,
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        usuario: state.usuario,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
