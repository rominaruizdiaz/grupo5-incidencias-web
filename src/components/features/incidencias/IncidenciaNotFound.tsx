import { useNavigate } from 'react-router-dom'

interface Props {
  incidenciaId?: string
}

export const IncidenciaNotFound = ({ incidenciaId }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-5xl mb-4"></div>
        <p className="text-gray-900 dark:text-slate-100 text-lg font-semibold mb-2">
          Incidencia no encontrada
        </p>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
          No pudimos encontrar la incidencia #{incidenciaId}
        </p>
        <button
          onClick={() => navigate('/panel')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Volver al Panel
        </button>
      </div>
    </div>
  )
}
