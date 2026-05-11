import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Incidencia, IncidenciaUrgencia } from '@/types'
import { IncidenciaCardNew } from '@/components/features/incidencias/IncidenciaCardNew'

type Props = {
  incidencias: Incidencia[]
  loading: boolean
}

export const IncidenciasKanban = ({ incidencias, loading }: Props) => {
  const navigate = useNavigate()

  const columnas = useMemo(() => {
    return {
      alta: incidencias.filter(i => i.urgencia === IncidenciaUrgencia.ALTA),
      media: incidencias.filter(i => i.urgencia === IncidenciaUrgencia.MEDIA),
      baja: incidencias.filter(i => i.urgencia === IncidenciaUrgencia.BAJA),
    }
  }, [incidencias])

  const Column = ({
    title,
    color,
    items,
  }: {
    title: string
    color: string
    items: Incidencia[]
  }) => {
    const empty = !loading && items.length === 0

    return (
      <div
        className="
        flex flex-col rounded-2xl border
        border-slate-200 bg-white p-4 min-h-[220px]

        dark:border-slate-700
        dark:bg-slate-950
      "
      >
        <h3 className={`font-bold mb-3 ${color}`}>
          {title} ({items.length})
        </h3>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div
                key={i}
                className="h-20 rounded-xl bg-slate-200 animate-pulse dark:bg-slate-800"
              />
            ))}
          </div>
        ) : empty ? (
          <div
            className="
            flex flex-1 items-center justify-center text-sm
            text-slate-400 dark:text-slate-500 text-center py-10
          "
          >
            Aún no hay incidencias en esta categoría
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(inc => (
              <IncidenciaCardNew
                key={inc.id}
                incidencia={inc}
                onClick={() => navigate(`/incidencia/${inc.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Column
        title="Alta prioridad"
        color="text-red-600 dark:text-red-400"
        items={columnas.alta}
      />

      <Column
        title="Media prioridad"
        color="text-amber-600 dark:text-amber-400"
        items={columnas.media}
      />

      <Column
        title="Baja prioridad"
        color="text-cyan-600 dark:text-cyan-400"
        items={columnas.baja}
      />
    </div>
  )
}
