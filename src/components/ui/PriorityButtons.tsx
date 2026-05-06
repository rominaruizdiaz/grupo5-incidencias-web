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
      <label className="block text-sm font-semibold text-gray-900">
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
              className={`h-24 rounded-xl border-2 transition flex flex-col items-center justify-center ${
                isSelected
                  ? COLOR_URGENCIA[option]
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <Icon size={26} className="mb-1" />
              <span className="text-sm font-semibold">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
