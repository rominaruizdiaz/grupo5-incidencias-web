import { useCreateIncidencia } from './useCreateIncidencia'
import { IncidenciaUrgencia } from '@/types'

export const CreateIncidenciaForm = () => {
  const {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    categoria,
    setCategoria,
    ubicacion,
    setUbicacion,
    urgencia,
    setUrgencia,
    loading,
    error,
    create,
  } = useCreateIncidencia()

  return (
    <form
      onSubmit={create}
      className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-bold">Nueva incidencia</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Título del problema"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={ubicacion}
        onChange={e => setUbicacion(e.target.value)}
      >
        <option value="Informática">Informática</option>
        <option value="Laboratorio">Laboratorio</option>
        <option value="Aula 101">Aula 101</option>
        <option value="Biblioteca">Biblioteca</option>
        <option value="Secretaría">Secretaría</option>
      </select>

      <select
        className="w-full border p-2 rounded"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
      >
        <option value="Hardware">Hardware</option>
        <option value="Software">Software</option>
        <option value="Red">Red</option>
        <option value="Limpieza">Limpieza</option>
        <option value="Otros">Otros</option>
      </select>

      <select
        className="w-full border p-2 rounded"
        value={urgencia}
        onChange={e => setUrgencia(e.target.value as IncidenciaUrgencia)}
      >
        <option value={IncidenciaUrgencia.BAJA}>Baja</option>
        <option value={IncidenciaUrgencia.MEDIA}>Media</option>
        <option value={IncidenciaUrgencia.ALTA}>Alta</option>
      </select>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Detalles adicionales..."
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
      >
        {loading ? 'Enviando...' : 'Enviar aviso'}
      </button>
    </form>
  )
}
