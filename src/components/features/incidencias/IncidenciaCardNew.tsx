import type { Incidencia } from '@/types'
import { UrgencyBadge } from '../../ui/UrgencyBadge'
import { COLOR_ESTADO } from '@/utils/constants'

type Props = {
  incidencia: Incidencia
  onClick: () => void
}

export const IncidenciaCardNew = ({ incidencia, onClick }: Props) => {
  const statusColor = COLOR_ESTADO[incidencia.estado] || 'bg-slate-300'

  return (
    <div
      onClick={onClick}
      className="
        group cursor-pointer
        rounded-2xl border border-slate-200
        bg-white p-4
        transition-all duration-200
        hover:border-slate-300 hover:shadow-md
        dark:border-slate-800 dark:bg-slate-900
        dark:hover:border-slate-700
        overflow-hidden
      "
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* PUNTITO */}
        <div
          className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${statusColor}`}
        />

        {/* CONTENIDO */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <h3 className="text-sm sm:text-base font-bold leading-tight break-words">
            {incidencia.titulo}
          </h3>

          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 break-words">
            Aula: {incidencia.ubicacion || 'Sin ubicación'}
          </p>
        </div>

        {/* BADGE */}
        <div className="flex-shrink-0">
          <UrgencyBadge urgencia={incidencia.urgencia} />
        </div>
      </div>
    </div>
  )
}
