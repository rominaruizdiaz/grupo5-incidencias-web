import { type Incidencia } from '@/types'

type Props = {
  incidencia: Incidencia
  onClick: () => void
}

export const IncidenciaCard = ({ incidencia, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="p-4 border border-black rounded-lg cursor-pointer hover:bg-gray-50 transition"
    >
      <h2 className="font-bold">{incidencia.titulo}</h2>

      <p className="text-sm text-gray-600">{incidencia.descripcion}</p>

      <div className="flex gap-2 mt-2 text-xs">
        <span>Estado: {incidencia.estado}</span>
        <span>Urgencia: {incidencia.urgencia}</span>
      </div>
    </div>
  )
}
