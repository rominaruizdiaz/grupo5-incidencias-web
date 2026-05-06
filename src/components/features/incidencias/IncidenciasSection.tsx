import { useNavigate } from 'react-router-dom'
import { useIncidencias } from '@/hooks/incidencias/useIncidencias'
import { IncidenciaCard } from './IncidenciaCard'

export const IncidenciasSection = () => {
  const navigate = useNavigate()
  const { incidencias, loading, error } = useIncidencias()

  if (loading) {
    return <p className="p-6">Cargando incidencias...</p>
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>
  }

  if (incidencias.length === 0) {
    return <p className="p-6 text-gray-500">No hay incidencias</p>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Incidencias</h2>

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
