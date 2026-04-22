import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { UserRole } from '@/types'
import type { AuthStore } from './auth.types'
import type { Usuario } from '@/types'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // funciones que cambian el estado
      usuario: null,
      isLoading: false,

      // lógica de permisos
      setUsuario: (usuario: Usuario | null) => {
        set({
          usuario,
          isLoading: false,
        })
      },

      setLoading: (value: boolean) => {
        set({ isLoading: value })
      },

      logout: () => {
        localStorage.removeItem('token')

        set({
          usuario: null,
          isLoading: false,
        })
      },

      // ROLES
      hasRole: (role: UserRole) => get().usuario?.rol === role,

      isAdmin: () => get().usuario?.rol === UserRole.ADMIN,
      isProfesor: () => get().usuario?.rol === UserRole.PROFESOR,
      isTecnico: () => get().usuario?.rol === UserRole.TECNICO,
    }),
    {
      name: 'auth-storage',

      partialize: state => ({
        usuario: state.usuario,
      }),
    }
  )
)
