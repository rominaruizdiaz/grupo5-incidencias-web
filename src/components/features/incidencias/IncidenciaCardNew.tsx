import type { Incidencia } from '@/types'
import { UrgencyBadge } from '../ui/UrgencyBadge'

type Props = {
  incidencia: Incidencia
  onClick: () => void
}

export const IncidenciaCardNew = ({ incidencia, onClick }: Props) => {
  const getStatusDot = () => {
    switch (incidencia.estado) {
      case 'Activo':
        return 'bg-red-500'
      case 'En curso':
        return 'bg-orange-500'
      case 'Resuelto':
        return 'bg-gray-300'
      default:
        return 'bg-gray-300'
    }
  }

  return (
    <div
      onClick={onClick}
      className="group rounded-2xl bg-white border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-300"
    >
      <div className="flex gap-3">
        <div
          className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getStatusDot()}`}
        />

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">
            {incidencia.titulo}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Aula: {incidencia.ubicacion || 'Sin ubicación'}
          </p>
        </div>

        <div className="flex-shrink-0">
          <UrgencyBadge urgencia={incidencia.urgencia} />
        </div>
      </div>
    </div>
  )
}
