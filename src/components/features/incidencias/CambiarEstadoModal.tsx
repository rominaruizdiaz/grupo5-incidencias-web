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
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    valor: IncidenciaEstado.EN_CURSO,
    label: 'En Curso',
    descripcion: 'Técnico trabajando',
    icono: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    valor: IncidenciaEstado.RESUELTO,
    label: 'Resuelto',
    descripcion: 'Solucionado',
    icono: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
]

export const CambiarEstadoModal = ({
  isOpen,
  onClose,
  onCambiar,
  loading,
  estadoActual,
}: CambiarEstadoModalProps) => {
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<IncidenciaEstado | null>(estadoActual || null)

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
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-96 max-w-[92vw]
          rounded-2xl border
          bg-white text-slate-900
          dark:bg-slate-900 dark:text-slate-100
          border-slate-200 dark:border-slate-800
          shadow-2xl z-50
        "
      >
        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Cambiar Estado</h2>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* ESTADO ACTUAL */}
          {estadoActualInfo && (
            <div
              className={`
                mb-4 p-3 rounded-xl border
                ${estadoActualInfo.bg}
                border-slate-200 dark:border-slate-800
              `}
            >
              <p className={`text-sm ${estadoActualInfo.color}`}>
                <strong>Estado actual:</strong> {estadoActualInfo.label}
              </p>
            </div>
          )}

          {/* LISTA */}
          <div className="space-y-2">
            <label className="text-sm text-slate-500 dark:text-slate-400">
              Selecciona nuevo estado
            </label>

            {ESTADOS.map(estado => {
              const Icon = estado.icono
              const isSelected = estadoSeleccionado === estado.valor
              const isCurrent = estado.valor === estadoActual

              return (
                <div
                  key={estado.valor}
                  onClick={() =>
                    !isCurrent && setEstadoSeleccionado(estado.valor)
                  }
                  className={`
                    flex items-center gap-3 p-3 rounded-xl border transition
                    ${
                      isCurrent
                        ? 'opacity-40 cursor-not-allowed'
                        : 'cursor-pointer hover:border-slate-400 dark:hover:border-slate-600'
                    }
                    ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800'
                    }
                  `}
                >
                  <Icon size={18} className={estado.color} />

                  <div>
                    <p className="font-medium">{estado.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {estado.descripcion}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CAMBIO */}
          {estadoNuevoInfo && estadoNuevoInfo.valor !== estadoActual && (
            <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Cambio: <strong>{estadoActualInfo?.label}</strong> →{' '}
                <strong>{estadoNuevoInfo.label}</strong>
              </p>
            </div>
          )}

          {/* BOTONES */}
          <div className="flex gap-2 pt-5 mt-5 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                flex-1 py-2 rounded-xl
                border border-slate-300 dark:border-slate-700
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleCambiar}
              disabled={
                loading ||
                !estadoSeleccionado ||
                estadoSeleccionado === estadoActual
              }
              className="
                flex-1 py-2 rounded-xl
                bg-blue-600 text-white
                hover:bg-blue-700
                disabled:opacity-50
                transition
              "
            >
              {loading ? 'Cambiando...' : 'Confirmar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
