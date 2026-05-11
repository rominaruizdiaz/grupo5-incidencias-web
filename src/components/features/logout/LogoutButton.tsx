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
        className="
          bg-red-600 text-white
          hover:bg-red-700 active:bg-red-800
          dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700

          font-semibold px-4 py-2 rounded-lg
          shadow-sm transition
        "
      >
        Cerrar sesión
      </button>

      {/* MODAL */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsModalOpen(false)}
          />

          <div
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-96 max-w-[90%]
              rounded-2xl border
              border-slate-200 bg-white
              shadow-xl

              dark:border-slate-800 dark:bg-slate-900
              z-50
            "
          >
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Confirmar cierre de sesión
              </h2>

              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                ¿Seguro que quieres salir del sistema?
              </p>

              {/* BOTONES */}
              <div className="mt-6 flex gap-2 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="
                    flex-1 rounded-lg border px-4 py-2 text-sm font-medium
                    border-slate-300 text-slate-700
                    hover:bg-slate-100

                    dark:border-slate-700 dark:text-slate-200
                    dark:hover:bg-slate-800
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={handleConfirmLogout}
                  className="
                    flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white
                    bg-red-600 hover:bg-red-700 active:bg-red-800
                    dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700
                  "
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
