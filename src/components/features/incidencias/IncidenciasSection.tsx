import { useNavigate } from 'react-router-dom'
import { useIncidencias } from '@/hooks/incidencias/useIncidencias'
import { IncidenciaCard } from './IncidenciaCard'

export const IncidenciasSection = () => {
  const navigate = useNavigate()
  const { incidencias, loading, error } = useIncidencias()

  if (loading) {
    return (
      <p className="p-6 text-slate-500 dark:text-slate-400">
        Cargando incidencias...
      </p>
    )
  }

  if (error) {
    return <p className="p-6 text-red-600 dark:text-red-400">{error}</p>
  }

  if (incidencias.length === 0) {
    return (
      <p className="p-6 text-slate-500 dark:text-slate-400">
        No hay incidencias
      </p>
    )
  }

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Incidencias
        </h2>

        <span
          className="
          text-xs font-semibold px-3 py-1 rounded-xl
          bg-slate-100 text-slate-600
          dark:bg-slate-800 dark:text-slate-300
        "
        >
          {incidencias.length}
        </span>
      </div>

      {/* GRID */}
      <div className="grid gap-4">
        {incidencias.map(inc => (
          <IncidenciaCard
            key={inc.id}
            incidencia={inc}
            onClick={() => navigate(`/incidencia/${inc.id}`)}
          />
        ))}
      </div>
    </div>
  )
}
