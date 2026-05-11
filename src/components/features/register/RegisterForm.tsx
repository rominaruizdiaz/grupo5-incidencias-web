import { useRegister } from '@/hooks/autentificacion/useRegister'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { User, Mail, Lock } from 'lucide-react'

export const RegisterForm = () => {
  const { register, loading, error } = useRegister()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [submitted, setSubmitted] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  // VALIDACIONES
  const nombreError = submitted
    ? !nombre
      ? 'El nombre es obligatorio'
      : nombre.length < 3
        ? 'Mínimo 3 caracteres'
        : !nombreRegex.test(nombre)
          ? 'Solo letras y espacios'
          : ''
    : ''

  const emailError = submitted
    ? !email
      ? 'El email es obligatorio'
      : !emailRegex.test(email)
        ? 'Email inválido'
        : ''
    : ''

  const passwordError = submitted
    ? !password
      ? 'La contraseña es obligatoria'
      : !passwordRegex.test(password)
        ? 'Mínimo 8 caracteres, mayúscula, minúscula y número'
        : ''
    : ''

  const isValid =
    nombreRegex.test(nombre) &&
    emailRegex.test(email) &&
    passwordRegex.test(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    if (!isValid) return

    await register({
      nombre,
      email,
      password,
    })
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 px-4">
      <div className="flex-1 flex items-center justify-center px-0 py-10">
        <div
          className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8
        dark:bg-slate-900 dark:border-slate-800 transition"
        >
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Crear Cuenta
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-sm">
              Regístrate en el sistema de incidencias
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NOMBRE */}
            <Input
              type="text"
              label="Nombre completo"
              placeholder="Tu nombre"
              icon={<User size={20} />}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              error={submitted ? nombreError : ''}
              required
            />

            {/* EMAIL */}
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              icon={<Mail size={20} />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={submitted ? emailError : ''}
              required
            />

            {/* PASSWORD */}
            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              icon={<Lock size={20} />}
              showPasswordToggle
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={submitted ? passwordError : ''}
              required
            />

            {/* REGLAS DEL PASSWORD */}
            <div className="text-xs text-gray-500 dark:text-slate-400 space-y-1 pl-1">
              <p>• Mínimo 8 caracteres</p>
              <p>• Al menos una mayúscula</p>
              <p>• Al menos una minúscula</p>
              <p>• Al menos un número</p>
            </div>

            {/* ERRORES */}
            {error && (
              <div
                className="mt-4 rounded-lg border p-3 bg-red-50 border-red-200
              dark:bg-red-950/40 dark:border-red-900"
              >
                <p className="text-sm font-medium text-red-700 dark:text-red-300">
                  {error === 'EMAIL_EXISTS'
                    ? 'Email ya existente'
                    : 'Error del servidor'}
                </p>
              </div>
            )}

            {/* BOTÓN */}
            <Button
              type="submit"
              loading={loading}
              size="lg"
              className="w-full mt-6"
            >
              Registrarse
            </Button>
          </form>

          {/* LOGIN */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-slate-400 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-bold text-blue-600 hover:text-blue-500 transition"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
