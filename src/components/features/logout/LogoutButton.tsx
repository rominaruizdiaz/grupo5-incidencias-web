import { useState } from 'react'
import { useLogout } from '../../../hooks/autentificacion/useLogout'

export const LogoutButton = () => {
  const { handleLogout } = useLogout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirmLogout = () => {
    handleLogout()
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200"
      >
        Cerrar sesión
      </button>

      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-96 max-w-full dark:bg-slate-950">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
                Confirmar cierre de sesión
              </h2>
              <p className="text-gray-700 dark:text-slate-200 mb-6">
                ¿Está seguro de que desea cerrar sesión?
              </p>
              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
