import type { IncidenciaUrgencia } from '@/types'

type Props = {
  urgencia: IncidenciaUrgencia
}

const URGENCY_CONFIG = {
  Alta: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700' },
  Media: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
  },
  Baja: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700' },
}

export const UrgencyBadge = ({ urgencia }: Props) => {
  const config = URGENCY_CONFIG[urgencia]

  return (
    <div
      className={`inline-block px-3 py-1 rounded-lg border text-xs font-bold ${config.bg} ${config.border} ${config.text}`}
    >
      {urgencia.toUpperCase()}
    </div>
  )
}
