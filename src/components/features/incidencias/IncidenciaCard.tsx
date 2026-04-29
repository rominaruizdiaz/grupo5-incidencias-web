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
      className="p-4 border border-slate-800 rounded-3xl cursor-pointer bg-slate-900/90 hover:bg-slate-800 transition"
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <h2 className="font-bold flex-1 text-white">{incidencia.titulo}</h2>
        {incidencia.ubicacion && (
          <div className="flex items-center gap-1 text-xs bg-slate-800 text-slate-100 px-2 py-1 rounded-full whitespace-nowrap">
            <MapPin size={12} />
            {incidencia.ubicacion}
          </div>
        )}
      </div>

      <p className="text-sm text-slate-300">{incidencia.descripcion}</p>

      <div className="flex gap-2 mt-4 text-xs flex-wrap">
        <span className={`${COLOR_ESTADO[incidencia.estado]} rounded-full px-3 py-1`}> 
          {incidencia.estado}
        </span>

        <span className={`${COLOR_URGENCIA[incidencia.urgencia]} rounded-full px-3 py-1`}>
          {incidencia.urgencia}
        </span>
      </div>
    </div>
  )
}
