import { useAuthStore } from './auth.store'

// state
export const useUsuario = () => useAuthStore(state => state.usuario)

export const useIsLoading = () => useAuthStore(state => state.isLoading)

// roles
export const useIsAdmin = () => useAuthStore(state => state.isAdmin())
export const useIsProfesor = () => useAuthStore(state => state.isProfesor())
export const useIsTecnico = () => useAuthStore(state => state.isTecnico())

// actions
export const setUsuario = (user: any) =>
  useAuthStore.getState().setUsuario(user)

export const setLoading = (value: boolean) =>
  useAuthStore.getState().setLoading(value)

export const logout = () => useAuthStore.getState().logout()
