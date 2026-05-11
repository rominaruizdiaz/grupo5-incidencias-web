import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useDeleteIncidencia } from '@/hooks/incidencias/useDeleteIncidencia'

type Props = {
  id: number
}

export const DeleteIncidenciaButton = ({ id }: Props) => {
  const { remove, loading } = useDeleteIncidencia()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirmDelete = async () => {
    const success = await remove(id)
    if (success) navigate('/panel')
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
        className="
          bg-red-600 hover:bg-red-700 active:bg-red-800
          text-white px-4 py-2 rounded-lg
          flex items-center justify-center gap-2
          transition
          disabled:opacity-50
        "
        aria-label="Borrar incidencia"
        title="Borrar incidencia"
      >
        <Trash2 size={18} />
      </button>

      {isModalOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/60 z-[100]"
              onClick={() => setIsModalOpen(false)}
            />

            {/* MODAL */}
            <div
              className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-96 max-w-full z-[101]
              bg-white dark:bg-slate-950
              border border-slate-200 dark:border-slate-800
              rounded-xl shadow-xl
            "
            >
              <div className="p-6">
                <h2
                  className="
                  text-xl font-semibold
                  text-slate-900 dark:text-slate-100
                  mb-4
                "
                >
                  Confirmar eliminación
                </h2>

                <p
                  className="
                  text-slate-600 dark:text-slate-400
                  mb-6
                "
                >
                  ¿Seguro que quieres borrar esta incidencia?
                </p>

                <div
                  className="
                  flex gap-2 pt-4
                  border-t border-slate-200 dark:border-slate-800
                "
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="
                      flex-1 px-4 py-2 rounded-md
                      border border-slate-300 dark:border-slate-700
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-100 dark:hover:bg-slate-800
                      transition
                    "
                  >
                    Cancelar
                  </button>

                  <button
                    onClick={handleConfirmDelete}
                    disabled={loading}
                    className="
                      flex-1 px-4 py-2 rounded-md
                      bg-red-600 hover:bg-red-700 active:bg-red-800
                      text-white
                      transition
                      disabled:opacity-50
                    "
                  >
                    {loading ? 'Eliminando...' : 'Borrar'}
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}
