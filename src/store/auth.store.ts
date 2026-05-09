import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { UserRole } from '@/types'
import type { AuthStore } from './auth.types'
import type { Usuario } from '@/types'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      usuario: null,
      isLoading: false,
      theme: 'light',

      setUsuario: (usuario: Usuario | null) => {
        set({ usuario, isLoading: false })
      },

      setLoading: (value: boolean) => {
        set({ isLoading: value })
      },

      setTheme: (theme: 'light' | 'dark') => {
        set({ theme })
      },

      toggleTheme: () => {
        set({ theme: get().theme === 'dark' ? 'light' : 'dark' })
      },

      logout: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('auth-storage')
        set({ usuario: null, isLoading: false })
      },

      hasRole: (role: UserRole) => get().usuario?.rol === role,

      isAdmin: () => get().usuario?.rol === UserRole.ADMIN,
      isProfesor: () => get().usuario?.rol === UserRole.PROFESOR,
      isTecnico: () => get().usuario?.rol === UserRole.TECNICO,
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        usuario: state.usuario,
        theme: state.theme,
      }),
    }
  )
)
