import { useState } from 'react'
import { X } from 'lucide-react'

interface ResolverIncidenciaModalProps {
  isOpen: boolean
  onClose: () => void
  onResolver: (descripcionResolucion?: string) => Promise<void>
  loading?: boolean
  tituloIncidencia?: string
}

export const ResolverIncidenciaModal = ({
  isOpen,
  onClose,
  onResolver,
  loading,
  tituloIncidencia,
}: ResolverIncidenciaModalProps) => {
  const [descripcion, setDescripcion] = useState('')

  if (!isOpen) return null

  const handleResolver = async () => {
    await onResolver(descripcion)
    setDescripcion('')
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
              Confirmar Resolución
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-900">
              <strong>Incidencia:</strong> {tituloIncidencia}
            </p>
            <p className="text-xs text-green-700 mt-1">
              Marcarás esta incidencia como resuelta
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de la resolución (opcional)
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe cómo fue resuelta la incidencia..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleResolver}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Resolviendo...' : 'Marcar Resuelto'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
