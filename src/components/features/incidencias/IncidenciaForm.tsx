import type {
  IncidenciaUrgencia,
  IncidenciaEstado,
  Departamento,
} from '@/types'
import { CATEGORIAS_DEFECTO } from '@/utils/constants'
import { Textarea, Button, PriorityButtons, SelectCard } from '../../ui'
import { X, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { EstadoSelector } from './EstadoSelector'

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
  onSelectResolved?: () => void
  fecha?: string
  reportadoPor?: string
  departamentos?: Departamento[]
  readOnlyFields?: boolean
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
    <form
      onSubmit={props.onSubmit}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      {/* HEADER */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <X size={22} />
        </button>

        <h1 className="text-center text-sm font-bold sm:text-base md:text-lg">
          {isEdit ? 'Gestión de Incidencia' : 'Reportar Incidencia'}
        </h1>

        <div className="w-6" />
      </div>

      {/* CONTENIDO */}
      <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* TITULO */}
        <div>
          <input
            type="text"
            value={props.titulo}
            onChange={e => props.setTitulo(e.target.value)}
            placeholder="¿Qué problema hay?"
            className="
              w-full bg-transparent font-black outline-none
              text-2xl sm:text-3xl md:text-4xl
              placeholder:text-slate-400 dark:placeholder:text-slate-600
              break-words
            "
            required
          />
        </div>

        {/* SELECTS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SelectCard
            label="Área / Aula afectada"
            value={props.ubicacion || null}
            placeholder="Seleccionar área..."
            options={departamentosForSelect}
            onChange={props.setUbicacion}
            icon=""
          />

          <SelectCard
            label="Tipo de problema"
            value={props.categoria || null}
            placeholder="Seleccionar tipo..."
            options={categoriasForSelect}
            onChange={props.setCategoria}
            icon=""
          />
        </div>

        {/* URGENCIA */}
        <PriorityButtons value={props.urgencia} onChange={props.setUrgencia} />

        {/* DETALLES */}
        <div>
          <h3 className="mb-2 text-sm font-bold text-slate-900 dark:text-slate-100">
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
          <div className="space-y-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 text-sm">
            {props.fecha && (
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Fecha:
                </span>{' '}
                {props.fecha}
              </p>
            )}

            {props.reportadoPor && (
              <p className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  Reportado por:
                </span>{' '}
                {props.reportadoPor}
              </p>
            )}
          </div>
        )}

        {/* ESTADO */}
        {isEdit && props.setEstado && props.estado && (
          <EstadoSelector
            estado={props.estado}
            onChange={props.setEstado}
            onSelectResolved={props.onSelectResolved}
          />
        )}

        {/* BOTON DE ENVIAR */}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            loading={props.loading}
            className="w-full"
            disabled={!props.titulo || !props.ubicacion || !props.categoria}
          >
            <CheckCircle size={20} />
            {isEdit ? 'Guardar cambios' : 'Enviar Aviso'}
          </Button>
        </div>
      </div>
    </form>
  )
}
