import type { IncidenciaEstado } from '@/types'
import { COLOR_ESTADO } from '@/utils/constants'

// etiquetas del estado de la incidencia
const ESTADO_LABELS: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  EN_CURSO: 'En proceso',
  RESUELTO: 'Resuelto',
}

type Props = {
  estado: IncidenciaEstado
}

export const StatusBadge = ({ estado }: Props) => {
  const config = COLOR_ESTADO[estado]

  return (
    <div
      className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-full
        border text-xs font-semibold
        transition-colors

        ${config}
      `}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      <span>{ESTADO_LABELS[estado] ?? estado}</span>
    </div>
  )
}
