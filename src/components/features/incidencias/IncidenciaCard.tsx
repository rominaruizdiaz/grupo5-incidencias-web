import { type Incidencia } from '@/types'
import { COLOR_ESTADO, COLOR_URGENCIA } from '@/utils/constants'

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
      <h2 className="font-bold">{incidencia.titulo}</h2>

      <p className="text-sm text-gray-600">{incidencia.descripcion}</p>

      <div className="flex gap-2 mt-2 text-xs">
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
