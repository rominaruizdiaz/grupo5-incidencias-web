import { useState } from 'react'
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
    if (success) {
      navigate('/panel')
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={loading}
        className="bg-red-600 text-white p-2 w-full rounded-lg flex items-center justify-center gap-2"
        aria-label="Borrar incidencia"
        title="Borrar incidencia"
      >
        <Trash2 size={16} />
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-96 max-w-full dark:bg-slate-950">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
                Confirmar eliminación
              </h2>
              <p className="text-gray-700 dark:text-slate-200 mb-6">
                ¿Seguro que quieres borrar esta incidencia?
              </p>
              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Eliminando...' : 'Borrar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
