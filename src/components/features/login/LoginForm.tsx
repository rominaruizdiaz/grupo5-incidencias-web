import { Link } from 'react-router-dom'
import { useLogin } from '@/hooks/useLogin'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, login, loading, error } =
    useLogin()

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form
          onSubmit={e => {
            e.preventDefault()
            login()
          }}
        >
          <input
            className="login-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />

          <input
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>

        <Link to="/register" className="login-secondary-button">
          No tienes cuenta? Regístrate
        </Link>
      </div>
    </div>
  )
}
