import { useLogin } from '@/hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Mail, Lock } from 'lucide-react'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, login, loading, error } =
    useLogin()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 mb-4">
            <p className="text-xs font-bold text-blue-700 tracking-widest">
              INICIO DE SESIÓN
            </p>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Bienvenido</h1>
          <p className="text-gray-600 text-sm">
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

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <Button type="submit" loading={loading} size="lg" className="mt-6">
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
  )
}
