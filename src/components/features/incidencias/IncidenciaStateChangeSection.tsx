import { IncidenciaEstado } from '@/types'

interface Props {
  estado: string
  asignadoA?: string
  titulo: string
  descripcion: string
  categoria: string
  ubicacion: string
  urgencia: string
  reportadoPor: string
  onEstadoChange: (estado: IncidenciaEstado) => void
}

export const IncidenciaStateChangeSection = ({
  estado,
  asignadoA,
  titulo,
  descripcion,
  categoria,
  ubicacion,
  urgencia,
  reportadoPor,
  onEstadoChange,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        {asignadoA && (
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-900">
              <strong>Asignado a:</strong> {asignadoA}
            </p>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-600">Título</p>
          <p className="text-lg font-semibold text-gray-900">{titulo}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Descripción</p>
          <p className="text-gray-700">{descripcion}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Estado</p>
            <p className="text-gray-900">{estado}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Urgencia</p>
            <p className="text-gray-900">{urgencia}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Categoría</p>
            <p className="text-gray-900">{categoria}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Ubicación</p>
            <p className="text-gray-900">{ubicacion}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Cambiar Estado</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEstadoChange(IncidenciaEstado.ACTIVO)}
            className={`px-4 py-2 rounded text-white transition ${
              estado === IncidenciaEstado.ACTIVO
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            Activo
          </button>
          <button
            onClick={() => onEstadoChange(IncidenciaEstado.EN_CURSO)}
            className={`px-4 py-2 rounded text-white transition ${
              estado === IncidenciaEstado.EN_CURSO
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            En Curso
          </button>
          <button
            onClick={() => onEstadoChange(IncidenciaEstado.RESUELTO)}
            className={`px-4 py-2 rounded text-white transition ${
              estado === IncidenciaEstado.RESUELTO
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
          >
            Resuelto
          </button>
        </div>
      </div>
    </div>
  )
}
