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
    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 space-y-4">
      {/* ASIGNADO */}
      {asignadoA && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-sm text-green-900">
            <strong>Asignado a:</strong> {asignadoA}
          </p>
        </div>
      )}

      {/* TITULO Y URGENCIA */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Título
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {incidencia.titulo}
          </p>
        </div>
        <div className="flex-shrink-0">
          <UrgencyBadge urgencia={incidencia.urgencia} />
        </div>
      </div>

      {/* DESCRIPCION */}
      {incidencia.descripcion && (
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Descripción
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {incidencia.descripcion}
          </p>
        </div>
      )}

      {/* DETALLES */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            Estado
          </p>
          <StatusBadge estado={incidencia.estado} />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            Categoría
          </p>
          <p className="text-sm font-medium text-gray-900">
            {incidencia.categoria}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            Ubicación
          </p>
          <p className="text-sm font-medium text-gray-900">
            {incidencia.ubicacion}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
            Fecha
          </p>
          <p className="text-sm font-medium text-gray-900">
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
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Reportado por
          </p>
          <p className="text-sm font-medium text-gray-900">{reportadoPor}</p>
        </div>
      )}
    </div>
  )
}
