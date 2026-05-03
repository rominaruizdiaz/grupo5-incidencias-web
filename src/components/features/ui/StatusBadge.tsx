import type { IncidenciaEstado } from '@/types'

type Props = {
  estado: IncidenciaEstado
}

const STATUS_CONFIG = {
  Activo: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
  'En curso': {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
  Resuelto: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    dot: 'bg-green-500',
  },
}

export const StatusBadge = ({ estado }: Props) => {
  const config = STATUS_CONFIG[estado]

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${config.bg} ${config.border}`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className={`text-xs font-semibold ${config.text}`}>{estado}</span>
    </div>
  )
}
