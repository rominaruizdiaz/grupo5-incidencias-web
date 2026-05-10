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
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Confirmar Resolución
            </h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X size={20} className="text-slate-700 dark:text-slate-300" />
            </button>
          </div>

          {/* INFO */}
          <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
            <p className="text-sm text-green-900 dark:text-green-300">
              <strong>Incidencia:</strong> {tituloIncidencia}
            </p>
            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
              Marcarás esta incidencia como resuelta
            </p>
          </div>

          {/* TEXTAREA */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Descripción de la resolución (opcional)
            </label>

            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Describe cómo fue resuelta la incidencia..."
              rows={4}
              disabled={loading}
              className="
                w-full px-3 py-2 rounded-xl resize-none
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-800
                text-slate-900 dark:text-slate-100
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
          </div>

          {/* BOTONES */}
          <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                flex-1 px-4 py-2 rounded-xl
                border border-slate-300 dark:border-slate-700
                text-slate-700 dark:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleResolver}
              disabled={loading}
              className="
                flex-1 px-4 py-2 rounded-xl
                bg-green-600 hover:bg-green-700
                text-white
                disabled:opacity-50
                transition
              "
            >
              {loading ? 'Resolviendo...' : 'Marcar Resuelto'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
