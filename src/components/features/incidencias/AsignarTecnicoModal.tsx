import { useEffect, useState } from 'react'
import { useObtenerTecnicos } from '@/hooks/personal/useObtenerTecnicos'
import { X, User, Badge } from 'lucide-react'
import type { Etiqueta } from '@/types'

interface AsignarTecnicoModalProps {
  isOpen: boolean
  onClose: () => void
  onAsignar: (idTecnico: number, nombreTecnico: string) => Promise<void>
  categoria?: string
  etiquetaActual?: Etiqueta | null
  loading?: boolean
}

export const AsignarTecnicoModal = ({
  isOpen,
  onClose,
  onAsignar,
  categoria,
  etiquetaActual,
  loading,
}: AsignarTecnicoModalProps) => {
  const { tecnicos, loading: loadingTecnicos } = useObtenerTecnicos()
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<number | null>(
    null
  )

  if (!isOpen) return null

  // Filtrar técnicos que tengan la especialidad (si aplica)
  const tecnicosDisponibles = etiquetaActual
    ? tecnicos.filter(t => t.especialidades.includes(etiquetaActual.id!))
    : tecnicos

  const handleAsignar = async () => {
    if (!tecnicoSeleccionado) return

    const tecnico = tecnicos.find(t => t.id === tecnicoSeleccionado)
    if (!tecnico) return

    try {
      await onAsignar(tecnicoSeleccionado, tecnico.nombre)
      setTecnicoSeleccionado(null)
      onClose()
    } catch (err) {
      console.error('Error asignando:', err)
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-96 max-w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Asignar Técnico
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X size={20} />
            </button>
          </div>

          {categoria && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <strong>Categoría:</strong> {categoria}
              </p>
              {etiquetaActual && (
                <p className="text-xs text-blue-700 mt-1">
                  Filtrando técnicos con esta especialidad
                </p>
              )}
            </div>
          )}

          {loadingTecnicos ? (
            <div className="text-center py-8 text-gray-500">
              Cargando técnicos...
            </div>
          ) : tecnicosDisponibles.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {etiquetaActual
                  ? 'No hay técnicos con esta especialidad'
                  : 'No hay técnicos disponibles'}
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tecnicosDisponibles.map(tecnico => (
                <button
                  key={tecnico.id}
                  onClick={() => setTecnicoSeleccionado(tecnico.id)}
                  className={`w-full p-3 rounded-lg border-2 transition text-left ${
                    tecnicoSeleccionado === tecnico.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <User size={18} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {tecnico.nombre}
                      </p>
                      <p className="text-xs text-gray-500">{tecnico.email}</p>
                      {tecnico.especialidades.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tecnico.especialidades.map(etiquetaId => (
                            <span
                              key={etiquetaId}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"
                            >
                              <Badge size={12} />
                              ID: {etiquetaId}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleAsignar}
              disabled={!tecnicoSeleccionado || loading || loadingTecnicos}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
