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
      className="
        p-4 rounded-3xl cursor-pointer
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        hover:bg-slate-50 dark:hover:bg-slate-800/60
        transition
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <h2 className="font-bold flex-1 text-slate-900 dark:text-slate-100">
          {incidencia.titulo}
        </h2>

        {incidencia.ubicacion && (
          <div
            className="
            flex items-center gap-1 text-xs
            px-2 py-1 rounded-full
            bg-slate-100 text-slate-600
            dark:bg-slate-800 dark:text-slate-300
            whitespace-nowrap
          "
          >
            <MapPin size={12} />
            {incidencia.ubicacion}
          </div>
        )}
      </div>

      {/* DESCRIPCIÓN */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {incidencia.descripcion}
      </p>

      {/* TAGS */}
      <div className="flex gap-2 mt-4 text-xs flex-wrap">
        <span
          className={`
          px-3 py-1 rounded-full font-medium
          ${COLOR_ESTADO[incidencia.estado]}
        `}
        >
          {incidencia.estado}
        </span>

        <span
          className={`
          px-3 py-1 rounded-full font-medium
          ${COLOR_URGENCIA[incidencia.urgencia]}
        `}
        >
          {incidencia.urgencia}
        </span>
      </div>
    </div>
  )
}
