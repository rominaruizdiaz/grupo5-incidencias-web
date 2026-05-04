import { useAuthStore } from './auth.store'
import type { Usuario } from '@/types'

// ================= STATE =================
export const useUsuario = () => useAuthStore(state => state.usuario)

export const useIsLoading = () => useAuthStore(state => state.isLoading)

// ================= ROLES =================
export const useIsAdmin = () => useAuthStore(state => state.usuario?.rol === 1)

export const useIsProfesor = () =>
  useAuthStore(state => state.usuario?.rol === 2)

export const useIsTecnico = () =>
  useAuthStore(state => state.usuario?.rol === 3)

// ================= ACTIONS =================
export const setUsuario = (user: Usuario | null) =>
  useAuthStore.getState().setUsuario(user)

export const setLoading = (value: boolean) =>
  useAuthStore.getState().setLoading(value)

export const logout = () => useAuthStore.getState().logout()
