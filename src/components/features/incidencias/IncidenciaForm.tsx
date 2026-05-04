import type {
  IncidenciaUrgencia,
  IncidenciaEstado,
  Departamento,
} from '@/types'
import { CATEGORIAS_DEFECTO } from '@/utils/constants'
import { IncidenciaEstado as EstadoEnum } from '@/types'
import { Input, Textarea, Button, PriorityButtons, SelectCard } from '../../ui'
import { X, CheckCircle, AlertCircle, Wrench } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const departamentosForSelect = (props.departamentos || []).map(d => ({
    id: d.id || '',
    nombre: d.nombre,
  }))

  const categoriasForSelect = CATEGORIAS_DEFECTO.map(c => ({
    id: c,
    nombre: c,
  }))

  return (
    <form onSubmit={props.onSubmit} className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <X size={24} />
        </button>

        <h1 className="text-lg font-bold text-gray-900">
          {isEdit ? 'Gestión de Incidencia' : 'Reportar Incidencia'}
        </h1>

        <div className="w-6" />
      </div>

      <div className="px-6 py-8 max-w-2xl mx-auto space-y-6">
        {/* TITULO */}
        <div>
          <input
            type="text"
            value={props.titulo}
            onChange={e => props.setTitulo(e.target.value)}
            placeholder="¿Qué problema hay?"
            className="w-full text-3xl font-black text-gray-900 bg-transparent outline-none placeholder:text-gray-300"
            required
          />
        </div>

        {/* DEPARTAMENTO */}
        <SelectCard
          label="Área / Aula afectada"
          value={props.ubicacion || null}
          placeholder="Seleccionar área..."
          options={departamentosForSelect}
          onChange={props.setUbicacion}
          icon=""
        />

        {/* CATEGORIA */}
        <SelectCard
          label="Tipo de problema"
          value={props.categoria || null}
          placeholder="Seleccionar tipo..."
          options={categoriasForSelect}
          onChange={props.setCategoria}
          icon=""
        />

        {/* URGENCIA */}
        <PriorityButtons value={props.urgencia} onChange={props.setUrgencia} />

        {/* DETALLES */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 block">
            Detalles adicionales
          </h3>
          <Textarea
            placeholder="Equipo afectado, cómo ocurrió..."
            value={props.descripcion}
            onChange={e => props.setDescripcion(e.target.value)}
            rows={5}
          />
        </div>

        {/* MODO EDICION */}
        {isEdit && (
          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-2">
            {props.fecha && (
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Fecha:</strong> {props.fecha}
              </p>
            )}
            {props.reportadoPor && (
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Reportado por:</strong>{' '}
                {props.reportadoPor}
              </p>
            )}
          </div>
        )}

        {/* ESTADO DEL MANTENIMIENTO */}
        {isEdit && props.setEstado && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900">
              Actualizar Estado
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  state: EstadoEnum.ACTIVO,
                  label: 'Activo',
                  icon: AlertCircle,
                  colors: 'bg-red-50 border-red-200 text-red-700',
                },
                {
                  state: EstadoEnum.EN_CURSO,
                  label: 'En Curso',
                  icon: Wrench,
                  colors: 'bg-orange-50 border-orange-200 text-orange-700',
                },
                {
                  state: EstadoEnum.RESUELTO,
                  label: 'Resuelto',
                  icon: CheckCircle,
                  colors: 'bg-green-50 border-green-200 text-green-700',
                },
              ].map(({ state, label, icon: Icon, colors }) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => props.setEstado!(state)}
                  className={`h-24 rounded-xl border-2 transition flex flex-col items-center justify-center ${
                    props.estado === state
                      ? `border-current ${colors}`
                      : 'border-gray-200 text-gray-500 bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  <Icon size={24} className="mb-1" />
                  <span className="text-xs font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BOTON DE ENVIAR */}
        <Button
          type="submit"
          size="lg"
          loading={props.loading}
          className="mt-8"
          disabled={!props.titulo || !props.ubicacion || !props.categoria}
        >
          <CheckCircle size={20} />
          {isEdit ? 'Guardar cambios' : 'Enviar Aviso'}
        </Button>
      </div>
    </form>
  )
}
