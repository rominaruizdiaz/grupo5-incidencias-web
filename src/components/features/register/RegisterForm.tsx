import { useRegister } from '@/hooks/useRegister'
import { useState } from 'react'

export const RegisterForm = () => {
  const { register, loading, error } = useRegister()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !password) return

    register({ nombre, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Nombre"
      />

      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />

      {error && <p>{error}</p>}

      <button disabled={loading}>
        {loading ? 'Cargando...' : 'Registrarse'}
      </button>
    </form>
  )
}
