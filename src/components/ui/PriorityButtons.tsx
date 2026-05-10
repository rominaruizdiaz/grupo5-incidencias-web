import { IncidenciaUrgencia } from '@/types'
import { COLOR_URGENCIA } from '@/utils/constants'
import { URGENCIA_OPTIONS } from '@/utils/incidenciaOptions'
import {
  Flame,
  AlertTriangle,
  ArrowDownCircle,
  type LucideIcon,
} from 'lucide-react'

// botones de elegir prioridad de las incidencias
type Props = {
  value: IncidenciaUrgencia
  onChange: (value: IncidenciaUrgencia) => void
}

const ICON_MAP: Record<IncidenciaUrgencia, LucideIcon> = {
  [IncidenciaUrgencia.ALTA]: Flame,
  [IncidenciaUrgencia.MEDIA]: AlertTriangle,
  [IncidenciaUrgencia.BAJA]: ArrowDownCircle,
}

export const PriorityButtons = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
        Nivel de Urgencia
      </label>

      <div className="grid grid-cols-3 gap-3">
        {URGENCIA_OPTIONS.map(option => {
          const isSelected = value === option
          const Icon = ICON_MAP[option]

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`
                h-20 sm:h-24
                rounded-xl border-2 transition
                flex flex-col items-center justify-center gap-1
                text-sm sm:text-base
                ${
                  isSelected
                    ? COLOR_URGENCIA[option]
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'
                }
              `}
            >
              <Icon size={24} />
              <span className="font-semibold">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
