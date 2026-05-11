import { X } from 'lucide-react'

interface DeleteUsuarioModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  loading?: boolean
  nombreUsuario?: string
}

export const DeleteUsuarioModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  nombreUsuario,
}: DeleteUsuarioModalProps) => {
  if (!isOpen) return null

  const handleConfirm = async () => {
    await onConfirm()
    onClose()
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
              Eliminar Usuario
            </h2>

            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50"
            >
              <X size={20} className="text-slate-700 dark:text-slate-300" />
            </button>
          </div>

          {/* INFO */}
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
            <p className="text-sm text-red-900 dark:text-red-300">
              <strong>Usuario:</strong> {nombreUsuario}
            </p>
            <p className="text-xs text-red-700 dark:text-red-400 mt-2">
              Esta acción no se puede deshacer. Se eliminará permanentemente el usuario y todos sus datos asociados.
            </p>
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
                transition
                disabled:opacity-50
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="
                flex-1 px-4 py-2 rounded-lg
                bg-red-600 hover:bg-red-700
                text-white
                disabled:opacity-50
                transition
              "
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
