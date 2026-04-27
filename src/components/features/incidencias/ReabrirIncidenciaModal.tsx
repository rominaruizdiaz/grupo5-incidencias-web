import { useState } from 'react'
import { X } from 'lucide-react'
import { IncidenciaEstado } from '@/types'

interface ReabrirIncidenciaModalProps {
  isOpen: boolean
  onClose: () => void
  onReabrir: (nuevoEstado: IncidenciaEstado) => Promise<void>
  loading?: boolean
  tituloIncidencia?: string
}

export const ReabrirIncidenciaModal = ({
  isOpen,
  onClose,
  onReabrir,
  loading,
  tituloIncidencia,
}: ReabrirIncidenciaModalProps) => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<IncidenciaEstado>(IncidenciaEstado.ACTIVO)

  if (!isOpen) return null

  const handleReabrir = async () => {
    await onReabrir(estadoSeleccionado)
    onClose()
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
              ¿Reabrir Incidencia?
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-900">
              <strong>Incidencia:</strong> {tituloIncidencia}
            </p>
            <p className="text-xs text-orange-700 mt-2">
              Estás a punto de reabrir esta incidencia. El técnico recibirá una notificación.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cambiar estado a:
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                style={{
                  borderColor: estadoSeleccionado === IncidenciaEstado.ACTIVO ? '#ef4444' : '#e5e7eb',
                  backgroundColor: estadoSeleccionado === IncidenciaEstado.ACTIVO ? '#fee2e2' : 'white'
                }}
              >
                <input
                  type="radio"
                  name="estado"
                  value={IncidenciaEstado.ACTIVO}
                  checked={estadoSeleccionado === IncidenciaEstado.ACTIVO}
                  onChange={() => setEstadoSeleccionado(IncidenciaEstado.ACTIVO)}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">Activo</p>
                  <p className="text-xs text-gray-600">Incidencia pendiente de atender</p>
                </div>
              </label>

              <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                style={{
                  borderColor: estadoSeleccionado === IncidenciaEstado.EN_CURSO ? '#f97316' : '#e5e7eb',
                  backgroundColor: estadoSeleccionado === IncidenciaEstado.EN_CURSO ? '#ffedd5' : 'white'
                }}
              >
                <input
                  type="radio"
                  name="estado"
                  value={IncidenciaEstado.EN_CURSO}
                  checked={estadoSeleccionado === IncidenciaEstado.EN_CURSO}
                  onChange={() => setEstadoSeleccionado(IncidenciaEstado.EN_CURSO)}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">En Curso</p>
                  <p className="text-xs text-gray-600">Técnico ya está trabajando en ello</p>
                </div>
              </label>
            </div>
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
              onClick={handleReabrir}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400"
            >
              {loading ? 'Reabriendo...' : 'Reabrir Ahora'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
