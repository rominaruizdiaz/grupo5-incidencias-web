export type RegisterFormData = {
  nombre: string
  email: string
  password: string
}

export type RegisterError = {
  message: string
  code?: string
}
