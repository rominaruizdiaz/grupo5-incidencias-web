import type { IncidenciaUrgencia, IncidenciaEstado, Departamento } from '@/types'
import '@/styles/IncidenciaForm.css'
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
    <form onSubmit={props.onSubmit} className="space-y-6">
      <h2 className="page-form-title">
        {isEdit ? 'Gestión de incidencia' : 'Nueva incidencia'}
      </h2>

      <div>
        <label className="page-form-label">Título</label>
        <input
          value={props.titulo}
          onChange={e => props.setTitulo(e.target.value)}
          className="page-input"
          placeholder="Título"
        />
      </div>

      <div>
        <label className="page-form-label">Urgencia</label>
        <select
          value={props.urgencia}
          onChange={e => props.setUrgencia(e.target.value as IncidenciaUrgencia)}
          className="page-select"
        >
          {URGENCIA_OPTIONS.map(u => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      {isEdit && (
        <div className="page-form-section">
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

      <div>
        <label className="page-form-label">Departamento/Área</label>
        <select
          value={props.ubicacion}
          onChange={e => props.setUbicacion(e.target.value)}
          className="page-select"
        >
          <option value="">Seleccionar departamento...</option>
          {props.departamentos?.map(dept => (
            <option key={dept.id} value={dept.nombre}>
              {dept.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="page-form-label">Categoría</label>
        <select
          value={props.categoria}
          onChange={e => props.setCategoria(e.target.value)}
          className="page-select"
        >
          {CATEGORIAS_DEFECTO.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="page-form-label">Detalles</label>
        <textarea
          value={props.descripcion}
          onChange={e => props.setDescripcion(e.target.value)}
          className="page-textarea"
          placeholder="Detalles"
        />
      </div>

      {isEdit && props.setEstado && (
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-200">Estado</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.ACTIVO)}
              className={`flex-1 py-2 px-3 rounded-2xl font-medium transition ${
                props.estado === EstadoEnum.ACTIVO
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              Activo
            </button>
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.EN_CURSO)}
              className={`flex-1 py-2 px-3 rounded-2xl font-medium transition ${
                props.estado === EstadoEnum.EN_CURSO
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              En Curso
            </button>
            <button
              type="button"
              onClick={() => props.setEstado!(EstadoEnum.RESUELTO)}
              className={`flex-1 py-2 px-3 rounded-2xl font-medium transition ${
                props.estado === EstadoEnum.RESUELTO
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              Resuelto
            </button>
          </div>
        </div>
      )}

      <button
        disabled={props.loading}
        className="page-button"
      >
        {isEdit ? 'Guardar cambios' : 'Crear'}
      </button>
    </form>
  )
}
