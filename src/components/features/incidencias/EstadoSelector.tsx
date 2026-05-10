import type { IncidenciaEstado } from '@/types'
import { IncidenciaEstado as EstadoEnum } from '@/types'
import { AlertCircle, CheckCircle, Wrench } from 'lucide-react'

type Props = {
  estado: IncidenciaEstado
  onChange: (estado: IncidenciaEstado) => void
  onSelectResolved?: () => void
  label?: string
}

export const EstadoSelector = ({
  estado,
  onChange,
  onSelectResolved,
  label = 'Actualizar Estado',
}: Props) => {
  const estados = [
    {
      state: EstadoEnum.ACTIVO,
      label: 'Activo',
      icon: AlertCircle,
      colors:
        'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900',
    },
    {
      state: EstadoEnum.EN_CURSO,
      label: 'En Curso',
      icon: Wrench,
      colors:
        'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900',
    },
    {
      state: EstadoEnum.RESUELTO,
      label: 'Resuelto',
      icon: CheckCircle,
      colors:
        'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900',
    },
  ]

  return (
    <div className="space-y-3">
      {label && (
        <h3 className="text-sm font-bold text-slate-100">
          {label}
        </h3>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {estados.map(({ state, label: btnLabel, icon: Icon, colors }) => (
          <button
            key={state}
            type="button"
            onClick={() => {
              if (state === EstadoEnum.RESUELTO && onSelectResolved) {
                onSelectResolved()
              } else {
                onChange(state)
              }
            }}
            className={`
              flex h-20 items-center justify-center gap-2 rounded-xl border-2 transition
              sm:h-24 sm:flex-col sm:gap-1
              ${
                estado === state
                  ? colors
                  : 'border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
              }
            `}
          >
            <Icon size={20} />
            <span className="text-sm font-semibold">{btnLabel}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
