import { useState } from 'react'
import { X, AlertCircle, Zap, CheckCircle } from 'lucide-react'
import { IncidenciaEstado } from '@/types'

interface CambiarEstadoModalProps {
  isOpen: boolean
  onClose: () => void
  onCambiar: (nuevoEstado: IncidenciaEstado) => Promise<void>
  loading?: boolean
  estadoActual?: IncidenciaEstado
}

const ESTADOS = [
  {
    valor: IncidenciaEstado.ACTIVO,
    label: 'Activo',
    descripcion: 'Pendiente de atender',
    icono: AlertCircle,
    color: '#ef4444',
    bgColor: '#fee2e2',
  },
  {
    valor: IncidenciaEstado.EN_CURSO,
    label: 'En Curso',
    descripcion: 'Técnico está trabajando',
    icono: Zap,
    color: '#f97316',
    bgColor: '#ffedd5',
  },
  {
    valor: IncidenciaEstado.RESUELTO,
    label: 'Resuelto',
    descripcion: 'Problema solucionado',
    icono: CheckCircle,
    color: '#22c55e',
    bgColor: '#dcfce7',
  },
]

export const CambiarEstadoModal = ({
  isOpen,
  onClose,
  onCambiar,
  loading,
  estadoActual,
}: CambiarEstadoModalProps) => {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<IncidenciaEstado | null>(
    estadoActual || null
  )

  if (!isOpen) return null

  const handleCambiar = async () => {
    if (!estadoSeleccionado) return
    await onCambiar(estadoSeleccionado)
    onClose()
  }

  const estadoActualInfo = ESTADOS.find(e => e.valor === estadoActual)
  const estadoNuevoInfo = ESTADOS.find(e => e.valor === estadoSeleccionado)

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
              Cambiar Estado
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>

          {estadoActualInfo && (
            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: estadoActualInfo.bgColor }}>
              <p className="text-sm" style={{ color: estadoActualInfo.color }}>
                <strong>Estado actual:</strong> {estadoActualInfo.label}
              </p>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecciona nuevo estado:
            </label>
            <div className="space-y-2">
              {ESTADOS.map((estado) => {
                const IconComponent = estado.icono
                const isSelected = estadoSeleccionado === estado.valor
                const isCurrent = estado.valor === estadoActual

                return (
                  <label
                    key={estado.valor}
                    className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition"
                    style={{
                      borderColor: isSelected ? estado.color : '#e5e7eb',
                      backgroundColor: isSelected ? estado.bgColor : 'white',
                      opacity: isCurrent && !isSelected ? 0.5 : 1,
                    }}
                  >
                    <input
                      type="radio"
                      name="estado"
                      value={estado.valor}
                      checked={isSelected}
                      onChange={() => setEstadoSeleccionado(estado.valor)}
                      disabled={isCurrent}
                      className="mr-3"
                    />
                    <IconComponent size={20} style={{ color: estado.color, marginRight: '8px' }} />
                    <div>
                      <p className="font-medium text-gray-900">{estado.label}</p>
                      <p className="text-xs text-gray-600">{estado.descripcion}</p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {estadoNuevoInfo && estadoNuevoInfo.valor !== estadoActual && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                Cambiarás de <strong>{estadoActualInfo?.label}</strong> a <strong>{estadoNuevoInfo.label}</strong>
              </p>
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
              onClick={handleCambiar}
              disabled={loading || !estadoSeleccionado || estadoSeleccionado === estadoActual}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Cambiando...' : 'Cambiar Estado'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
