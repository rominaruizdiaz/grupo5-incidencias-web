import { useLogin } from './useLogin'

export const LoginForm = () => {
  const { email, password, setEmail, setPassword, login, loading, error } =
    useLogin()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        login()
      }}
    >
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />

      {error && <p>{error}</p>}

      <button disabled={loading}>{loading ? 'Cargando...' : 'Entrar'}</button>
    </form>
  )
}
