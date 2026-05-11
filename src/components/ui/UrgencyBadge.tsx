import { IncidenciaUrgencia } from '@/types'
import { COLOR_URGENCIA } from '@/utils/constants'

// etiqueta de prioridad de las incidencias
type Props = {
  urgencia: IncidenciaUrgencia
}

export const UrgencyBadge = ({ urgencia }: Props) => {
  const config = COLOR_URGENCIA[urgencia]

  return (
    <div className={`rounded-lg border px-3 py-1 text-xs font-bold ${config}`}>
      {urgencia.toUpperCase()}
    </div>
  )
}
