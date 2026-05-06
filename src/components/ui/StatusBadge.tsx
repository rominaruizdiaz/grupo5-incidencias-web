import type { IncidenciaEstado } from '@/types'
import { COLOR_ESTADO } from '@/utils/constants'

// etiquetas del estado de la incidencia
type Props = {
  estado: IncidenciaEstado
}

export const StatusBadge = ({ estado }: Props) => {
  const config = COLOR_ESTADO[estado]

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${config}`}
    >
      <div className="w-2 h-2 rounded-full bg-current" />
      <span className="text-xs font-semibold">{estado}</span>
    </div>
  )
}
