import { useParams } from 'react-router-dom'
import { useIncidencias } from '@/hooks/useIncidencias'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const { incidencias } = useIncidencias()

  const incidencia = incidencias.find(i => i.id === Number(id))

  if (!incidencia) return <p>No encontrada</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{incidencia.titulo}</h1>

      <p className="mt-4">{incidencia.descripcion}</p>

      <div className="mt-4 text-sm">
        <p>Estado: {incidencia.estado}</p>
        <p>Urgencia: {incidencia.urgencia}</p>
        <p>Categoría: {incidencia.categoria}</p>
        <p>Ubicación: {incidencia.ubicacion}</p>
      </div>
    </div>
  )
}
