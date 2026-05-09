import { useLogin } from '@/hooks/autentificacion/useLogin'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../ui/Input'
import { Button } from '../../ui/Button'
import { Mail, Lock } from 'lucide-react'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, login, loading, error } =
    useLogin()
  const navigate = useNavigate()

  return (
    <div className="min-h-[100dvh] flex flex-col from-blue-50 to-indigo-50">
      {/* FORMULARIO */}
      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md lg:max-w-lg bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
          {' '}
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Bienvenido
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Organiza y eleva la gestión de tu centro.
            </p>
          </div>
          {/* FORMULARIO */}
          <form
            onSubmit={e => {
              e.preventDefault()
              login()
            }}
            className="space-y-4"
          >
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="tu@email.com"
              icon={<Mail size={20} />}
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={error ? 'Credenciales inválidas' : undefined}
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

            <Button
              type="submit"
              loading={loading}
              size="lg"
              className="w-full mt-6"
            >
              Iniciar Sesión
            </Button>
          </form>
          {/* ¿NO ESTAS REGISTRADO? */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              ¿No tienes una cuenta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-bold text-blue-600 hover:text-blue-700 transition"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
