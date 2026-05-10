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
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      {/* CARD */}
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
            Bienvenido
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Organiza y eleva la gestión de tu centro.
          </p>
        </div>

        {/* FORM */}
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

        {/* REGISTER */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ¿No tienes una cuenta?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
