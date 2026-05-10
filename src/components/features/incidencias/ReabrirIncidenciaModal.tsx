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
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<IncidenciaEstado>(IncidenciaEstado.ACTIVO)

  if (!isOpen) return null

  const handleReabrir = async () => {
    await onReabrir(estadoSeleccionado)
    onClose()
  }

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* MODAL */}
      <div
        className="
        fixed top-1/2 left-1/2 z-50
        -translate-x-1/2 -translate-y-1/2

        w-96 max-w-full
        rounded-2xl
        border border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        shadow-xl
      "
      >
        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ¿Reabrir incidencia?
            </h2>

            <button
              onClick={onClose}
              className="
                rounded-lg p-1
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              <X size={20} />
            </button>
          </div>

          {/* INFO */}
          <div
            className="
            mb-4 p-3 rounded-xl
            bg-orange-50 border border-orange-200
            dark:bg-orange-950/30 dark:border-orange-900
          "
          >
            <p className="text-sm text-orange-900 dark:text-orange-200">
              <strong>Incidencia:</strong> {tituloIncidencia}
            </p>

            <p className="text-xs mt-2 text-orange-700 dark:text-orange-300">
              El técnico recibirá una notificación al reabrirla.
            </p>
          </div>

          {/* OPCIONES */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Cambiar estado a:
            </p>

            <div className="space-y-2">
              {/* ACTIVO */}
              <label
                className="
                  flex items-center p-3 rounded-xl border-2 cursor-pointer
                  transition
                  border-slate-200 dark:border-slate-700
                  hover:border-red-400
                "
                style={{
                  borderColor:
                    estadoSeleccionado === IncidenciaEstado.ACTIVO
                      ? '#ef4444'
                      : undefined,
                }}
              >
                <input
                  type="radio"
                  name="estado"
                  checked={estadoSeleccionado === IncidenciaEstado.ACTIVO}
                  onChange={() =>
                    setEstadoSeleccionado(IncidenciaEstado.ACTIVO)
                  }
                  className="mr-3"
                />

                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    Activo
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pendiente de atención
                  </p>
                </div>
              </label>

              {/* EN CURSO */}
              <label
                className="
                  flex items-center p-3 rounded-xl border-2 cursor-pointer
                  transition
                  border-slate-200 dark:border-slate-700
                  hover:border-orange-400
                "
                style={{
                  borderColor:
                    estadoSeleccionado === IncidenciaEstado.EN_CURSO
                      ? '#f97316'
                      : undefined,
                }}
              >
                <input
                  type="radio"
                  name="estado"
                  checked={estadoSeleccionado === IncidenciaEstado.EN_CURSO}
                  onChange={() =>
                    setEstadoSeleccionado(IncidenciaEstado.EN_CURSO)
                  }
                  className="mr-3"
                />

                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">
                    En curso
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Técnico trabajando
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                flex-1 px-4 py-2 rounded-lg
                border border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleReabrir}
              disabled={loading}
              className="
                flex-1 px-4 py-2 rounded-lg
                bg-orange-600 text-white
                hover:bg-orange-700
                disabled:opacity-50
              "
            >
              {loading ? 'Reabriendo...' : 'Reabrir'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
