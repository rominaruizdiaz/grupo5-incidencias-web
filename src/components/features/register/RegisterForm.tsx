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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !password) return

    register({ nombre, email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Crear Cuenta
          </h1>
          <p className="text-gray-600 text-sm">
            Regístrate en el sistema de incidencias
          </p>
        </div>

        {/* FORMULARIO */}
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

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <Button type="submit" loading={loading} size="lg" className="mt-6">
            Registrarse
          </Button>
        </form>

        {/* INICIAR SESIÓN */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-blue-600 hover:text-blue-700 transition"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
