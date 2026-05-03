import { IncidenciaUrgencia } from '@/types'
import { URGENCIA_OPTIONS } from '@/utils/incidenciaOptions'

type Props = {
  value: IncidenciaUrgencia
  onChange: (value: IncidenciaUrgencia) => void
}

const COLORS: Record<
  IncidenciaUrgencia,
  { bg: string; border: string; text: string }
> = {
  [IncidenciaUrgencia.ALTA]: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
  },
  [IncidenciaUrgencia.MEDIA]: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
  },
  [IncidenciaUrgencia.BAJA]: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
  },
}

//encontrar svg
const EMOJI_MAP: Record<IncidenciaUrgencia, string> = {
  [IncidenciaUrgencia.ALTA]: 'x',
  [IncidenciaUrgencia.MEDIA]: 'x',
  [IncidenciaUrgencia.BAJA]: 'x',
}

export const PriorityButtons = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        Nivel de Urgencia
      </label>

      <div className="grid grid-cols-3 gap-3">
        {URGENCIA_OPTIONS.map(option => {
          const colors = COLORS[option]
          const isSelected = value === option

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`h-24 rounded-xl border-2 transition flex flex-col items-center justify-center ${
                isSelected
                  ? `${colors.bg} border-current ${colors.text}`
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <div className={`text-2xl mb-1 ${colors.text}`}>
                {EMOJI_MAP[option]}
              </div>

              <span className="text-sm font-semibold">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
