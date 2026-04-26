import { type Incidencia } from '@/types'
import { COLOR_ESTADO, COLOR_URGENCIA } from '@/utils/constants'
import { MapPin } from 'lucide-react'

type Props = {
  incidencia: Incidencia
  onClick: () => void
}

export const IncidenciaCard = ({ incidencia, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <h2 className="font-bold flex-1">{incidencia.titulo}</h2>
        {incidencia.ubicacion && (
          <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap">
            <MapPin size={12} />
            {incidencia.ubicacion}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600">{incidencia.descripcion}</p>

      <div className="flex gap-2 mt-3 text-xs flex-wrap">
        <span className={COLOR_ESTADO[incidencia.estado]}>
          {incidencia.estado}
        </span>

        <span className={COLOR_URGENCIA[incidencia.urgencia]}>
          {incidencia.urgencia}
        </span>
      </div>
    </div>
  )
}
