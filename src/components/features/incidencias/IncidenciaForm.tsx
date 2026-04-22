import type { IncidenciaUrgencia, IncidenciaEstado } from '@/types'
import { ESPECIALIDADES_DEFECTO } from '@/utils/constants'
import { URGENCIA_OPTIONS, ESTADO_OPTIONS } from '@/utils/incidenciaOptions'

type Props = {
  mode: 'create' | 'edit'
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
  titulo: string
  setTitulo: (v: string) => void
  descripcion: string
  setDescripcion: (v: string) => void
  especialidad: string
  setEspecialidad: (v: string) => void
  ubicacion: string
  setUbicacion: (v: string) => void
  urgencia: IncidenciaUrgencia
  setUrgencia: (v: IncidenciaUrgencia) => void
  estado?: IncidenciaEstado
  setEstado?: (v: IncidenciaEstado) => void
  fecha?: string
  reportadoPor?: string
}

export const IncidenciaForm = (props: Props) => {
  const isEdit = props.mode === 'edit'

  return (
    <form onSubmit={props.onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {isEdit ? 'Gestión de incidencia' : 'Nueva incidencia'}
      </h2>

      <input
        value={props.titulo}
        onChange={e => props.setTitulo(e.target.value)}
        className="border p-2 w-full"
        placeholder="Título"
      />

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

      {isEdit && (
        <div className="p-3 bg-gray-50 border rounded text-sm space-y-1">
          <p>
            <strong>Fecha:</strong> {props.fecha}
          </p>
          {props.reportadoPor && (
            <p>
              <strong>Reportado por:</strong> {props.reportadoPor}
            </p>
          )}
        </div>
      )}

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
        value={props.especialidad}
        onChange={e => props.setEspecialidad(e.target.value)}
        className="border p-2 w-full"
      >
        {ESPECIALIDADES_DEFECTO.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <textarea
        value={props.descripcion}
        onChange={e => props.setDescripcion(e.target.value)}
        className="border p-2 w-full"
        placeholder="Detalles"
      />

      {isEdit && props.setEstado && (
        <select
          value={props.estado}
          onChange={e => props.setEstado!(e.target.value as IncidenciaEstado)}
          className="border p-2 w-full"
        >
          {ESTADO_OPTIONS.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      )}

      <button
        disabled={props.loading}
        className="bg-blue-600 text-white p-2 w-full"
      >
        {isEdit ? 'Guardar cambios' : 'Crear'}
      </button>
    </form>
  )
}
