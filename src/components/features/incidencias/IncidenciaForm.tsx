import type { IncidenciaUrgencia } from '@/types'
import { CATEGORIAS_DEFECTO } from '@/utils/constants'
import { URGENCIA_OPTIONS } from '@/utils/incidenciaOptions'

type Props = {
  mode: 'create' | 'edit'
  loading: boolean
  onSubmit: (e: React.FormEvent) => void

  titulo: string
  setTitulo: (v: string) => void
  descripcion: string
  setDescripcion: (v: string) => void
  categoria: string
  setCategoria: (v: string) => void
  ubicacion: string
  setUbicacion: (v: string) => void
  urgencia: IncidenciaUrgencia
  setUrgencia: (v: IncidenciaUrgencia) => void
}

export const IncidenciaForm = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {props.mode === 'create' ? 'Nueva incidencia' : 'Editar incidencia'}
      </h2>

      <input
        value={props.titulo}
        onChange={e => props.setTitulo(e.target.value)}
        className="border p-2 w-full"
        placeholder="Título"
      />

      <select
        value={props.ubicacion}
        onChange={e => props.setUbicacion(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="Informática">Informática</option>
        <option value="Laboratorio">Laboratorio</option>
        <option value="Aula 101">Aula 101</option>
        <option value="Biblioteca">Biblioteca</option>
        <option value="Secretaría">Secretaría</option>
      </select>

      <select
        value={props.urgencia}
        onChange={e => props.setUrgencia(e.target.value as IncidenciaUrgencia)}
        className="border p-2 w-full"
      >
        {URGENCIA_OPTIONS.map(u => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <select
        value={props.categoria}
        onChange={e => props.setCategoria(e.target.value)}
        className="border p-2 w-full"
      >
        {CATEGORIAS_DEFECTO.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <textarea
        value={props.descripcion}
        onChange={e => props.setDescripcion(e.target.value)}
        className="border p-2 w-full"
        placeholder="Descripción"
      />

      <button
        disabled={props.loading}
        className="bg-blue-600 text-white p-2 w-full"
      >
        {props.mode === 'create' ? 'Crear' : 'Guardar cambios'}
      </button>
    </form>
  )
}
