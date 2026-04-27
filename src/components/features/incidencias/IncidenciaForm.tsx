import type { IncidenciaUrgencia, IncidenciaEstado, Departamento } from '@/types'
import { CATEGORIAS_DEFECTO } from '@/utils/constants'
import { URGENCIA_OPTIONS, ESTADO_OPTIONS } from '@/utils/incidenciaOptions'
import { IncidenciaEstado as EstadoEnum } from '@/types'

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
  estado?: IncidenciaEstado
  setEstado?: (v: IncidenciaEstado) => void
  fecha?: string
  reportadoPor?: string
  departamentos?: Departamento[]
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

      <label className="block text-sm font-medium">Departamento/Área</label>
      <select
        value={props.ubicacion}
        onChange={e => props.setUbicacion(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Seleccionar departamento...</option>
        {props.departamentos?.map(dept => (
          <option key={dept.id} value={dept.nombre}>
            {dept.nombre}
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
        placeholder="Detalles"
      />

      {isEdit && props.setEstado && (
        <div>
          <label className="block text-sm font-medium mb-2">Estado</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.ACTIVO)}
              className={`flex-1 py-2 px-3 rounded font-medium transition ${
                props.estado === EstadoEnum.ACTIVO
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Activo
            </button>
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.EN_CURSO)}
              className={`flex-1 py-2 px-3 rounded font-medium transition ${
                props.estado === EstadoEnum.EN_CURSO
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              En Curso
            </button>
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.RESUELTO)}
              className={`flex-1 py-2 px-3 rounded font-medium transition ${
                props.estado === EstadoEnum.RESUELTO
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Resuelto
            </button>
          </div>
        </div>
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
