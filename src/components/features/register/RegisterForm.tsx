import { useState } from 'react'
import { useRegister } from './useRegister'

export const RegisterForm = () => {
  const { register, loading, error } = useRegister()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombre || !email || !password) return

    register({
      nombre,
      email,
      password,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Crear cuenta</h2>

      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        className="w-full border border-black p-2 rounded"
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full border border-black p-2 rounded"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full border border-black p-2 rounded"
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded font-semibold hover:opacity-80"
      >
        {loading ? 'Creando cuenta...' : 'Registrarse'}
      </button>
    </form>
  )
}
