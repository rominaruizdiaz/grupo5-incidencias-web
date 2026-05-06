import { IncidenciaUrgencia } from '@/types'
import { COLOR_URGENCIA } from '@/utils/constants'

// etiqueta de prioridad de las incidencias
type Props = {
  urgencia: IncidenciaUrgencia
}

export const UrgencyBadge = ({ urgencia }: Props) => {
  const config = COLOR_URGENCIA[urgencia]

  return (
    <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${config}`}>
      {urgencia.toUpperCase()}
    </div>
  )
}
