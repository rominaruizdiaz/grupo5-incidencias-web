import { useIncidencias } from '@/hooks/useIncidencias'
import { useNavigate } from 'react-router-dom'
import { IncidenciaCard } from '@/components/features/incidencias/IncidenciaCard'

export const PanelPage = () => {
  const { incidencias, loading } = useIncidencias()
  const navigate = useNavigate()

  if (loading) return <p className="p-6">Cargando...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incidencias</h1>

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
