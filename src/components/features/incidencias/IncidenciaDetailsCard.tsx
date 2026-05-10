import type { Incidencia } from '@/types'
import { StatusBadge } from '../../ui/StatusBadge'
import { UrgencyBadge } from '../../ui/UrgencyBadge'

type Props = {
  incidencia: Incidencia
  reportadoPor?: string
  asignadoA?: string
}

export const IncidenciaDetailsCard = ({
  incidencia,
  reportadoPor,
  asignadoA,
}: Props) => {
  return (
    <div
      className="
      rounded-2xl p-6 space-y-5
      border border-slate-200 dark:border-slate-800
      bg-white dark:bg-slate-900
    "
    >
      {/* ASIGNADO */}
      {asignadoA && (
        <div
          className="
          rounded-xl p-3
          bg-green-50 text-green-700
          dark:bg-green-950/30 dark:text-green-300
          border border-green-200 dark:border-green-900
        "
        >
          <p className="text-sm">
            <strong>Asignado a:</strong> {asignadoA}
          </p>
        </div>
      )}

      {/* TITULO + URGENCIA */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-2
            text-slate-500 dark:text-slate-400
          "
          >
            Título
          </p>

          <p
            className="
            text-2xl font-bold
            text-slate-900 dark:text-slate-100
          "
          >
            {incidencia.titulo}
          </p>
        </div>

        <div className="flex-shrink-0">
          <UrgencyBadge urgencia={incidencia.urgencia} />
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      {incidencia.descripcion && (
        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-2
            text-slate-500 dark:text-slate-400
          "
          >
            Descripción
          </p>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {incidencia.descripcion}
          </p>
        </div>
      )}

      {/* GRID DETALLES */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-1
            text-slate-500 dark:text-slate-400
          "
          >
            Estado
          </p>
          <StatusBadge estado={incidencia.estado} />
        </div>

        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-1
            text-slate-500 dark:text-slate-400
          "
          >
            Categoría
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {incidencia.categoria}
          </p>
        </div>

        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-1
            text-slate-500 dark:text-slate-400
          "
          >
            Ubicación
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {incidencia.ubicacion}
          </p>
        </div>

        <div>
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-1
            text-slate-500 dark:text-slate-400
          "
          >
            Fecha
          </p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {new Date(incidencia.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* REPORTADOR */}
      {reportadoPor && (
        <div
          className="
          pt-3 border-t
          border-slate-200 dark:border-slate-800
        "
        >
          <p
            className="
            text-xs font-semibold uppercase tracking-wide mb-2
            text-slate-500 dark:text-slate-400
          "
          >
            Reportado por
          </p>

          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {reportadoPor}
          </p>
        </div>
      )}
    </div>
  )
}
