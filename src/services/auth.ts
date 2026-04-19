import api from './api'

// usa axios para realizar el login, logout y registro
export const loginRequest = async (email: string, password: string) => {
  const { data } = await api.post('/login', {
    email,
    password,
  })

  return data
}
