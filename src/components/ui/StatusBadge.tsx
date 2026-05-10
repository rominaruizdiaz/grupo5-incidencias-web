import type { IncidenciaEstado } from '@/types'
import { IncidenciaEstado as EstadoEnum } from '@/types'

const ESTADO_STYLES: Record<IncidenciaEstado, string> = {
  [EstadoEnum.ACTIVO]:
    'bg-red-600 text-white border-red-500 dark:bg-red-500 dark:text-white',
  [EstadoEnum.EN_CURSO]:
    'bg-orange-600 text-white border-orange-500 dark:bg-orange-500 dark:text-white',
  [EstadoEnum.RESUELTO]:
    'bg-green-600 text-white border-green-500 dark:bg-green-500 dark:text-white',
}

const ESTADO_LABELS: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  EN_CURSO: 'En proceso',
  RESUELTO: 'Resuelto',
}

type Props = {
  estado: IncidenciaEstado
  onClick?: () => void
  clickable?: boolean
}

export const StatusBadge = ({ estado, onClick, clickable = false }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={!clickable}
      className={`
        inline-flex items-center gap-2
        px-3 py-1 rounded-full
        border text-xs font-semibold
        transition

        ${clickable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
        ${ESTADO_STYLES[estado]}
      `}
    >
      <span className="h-2 w-2 rounded-full bg-white/90" />
      <span>{ESTADO_LABELS[estado] ?? estado}</span>
    </button>
  )
}
