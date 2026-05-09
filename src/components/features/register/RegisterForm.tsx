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
  const [localError, setLocalError] = useState<string | null>(null)

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    if (!nombre || !email || !password) return

    if (!emailPattern.test(email)) {
      setLocalError('El correo debe tener formato *@*.* y no contener espacios')
      return
    }

    if (password.length < 4) {
      setLocalError('La contraseña debe ser mayor a 4 caracteres')
      return
    }

    register({ nombre, email, password })
  }

  return (
    <div
      className="
      min-h-[100dvh]
      flex
      from-blue-50 to-indigo-50
    "
    >
      {/* FORMULARIO*/}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Regístrate en el sistema de incidencias
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Nombre completo"
              placeholder="Tu nombre"
              icon={<User size={20} />}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />

            <Input
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              icon={<Mail size={20} />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              title="El correo debe tener formato usuario@dominio.ext y no puede contener espacios"
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              icon={<Lock size={20} />}
              showPasswordToggle
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {(localError || error) && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm font-medium text-red-700">
                  {localError || error}
                </p>
              </div>
            )}

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
            <p className="text-gray-600 text-sm">
              ¿Ya tienes cuenta?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-bold text-blue-600 hover:text-blue-700"
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
