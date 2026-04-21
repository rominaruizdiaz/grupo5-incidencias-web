import { useAuthStore } from './auth.store'

// state
export const useUsuario = () => useAuthStore(state => state.usuario)

export const useIsLoading = () => useAuthStore(state => state.isLoading)

// actions
export const setUsuario = (user: any) =>
  useAuthStore.getState().setUsuario(user)

export const setLoading = (value: boolean) =>
  useAuthStore.getState().setLoading(value)

export const logout = () => useAuthStore.getState().logout()
