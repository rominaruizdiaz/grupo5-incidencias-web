import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { useNotificacionesStore } from '@/store/notification.store'
import { Check } from 'lucide-react'
import type { Notificacion } from '@/types'

export const NotificationsPage = () => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const {
    notificaciones,
    sinLeer,
    loading,
    refresh,
    markAsRead,
    markAllAsRead,
  } = useNotificacionesStore()

  useEffect(() => {
    if (usuario?.id) refresh(usuario.id)
  }, [usuario, refresh])

  const handleClick = async (n: Notificacion) => {
    if (!n.id) return

    await markAsRead(n.id)
    if (n.idIncidenciaVinculada) {
      navigate(`/incidencia/${n.idIncidenciaVinculada}`)
    }
  }

  const handleMarkAll = async () => {
    if (!usuario?.id) return
    await markAllAsRead(usuario.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Cargando notificaciones...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* TEXTO */}
          <div>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Centro de Avisos
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              {sinLeer > 0 ? `${sinLeer} sin leer` : 'Todo al día'}
            </p>
          </div>

          {/* BOTÓN */}
          {sinLeer > 0 && (
            <button
              onClick={handleMarkAll}
              className="
                hidden sm:flex items-center gap-2
                rounded-2xl bg-blue-600 px-5 py-3
                text-sm font-bold text-white
                shadow-lg shadow-blue-600/20
                transition hover:bg-blue-700 active:scale-[0.98]
              "
            >
              <Check size={18} />
              Marcar todo
            </button>
          )}
        </div>
      </div>

      {/* LISTA */}
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 space-y-4">
        {notificaciones.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">
              Sin notificaciones
            </p>
          </div>
        ) : (
          notificaciones.map(n => (
            <div
              key={n.id}
              onClick={() => handleClick(n)}
              className={`
                cursor-pointer rounded-2xl border p-5 transition
                hover:shadow-sm active:scale-[0.995]

                ${
                  n.leida
                    ? `
                      border-slate-200 bg-white
                      dark:border-slate-800 dark:bg-slate-900
                      hover:bg-slate-50 dark:hover:bg-slate-800/60
                    `
                    : `
                      border-blue-200 bg-blue-50
                      dark:border-blue-900 dark:bg-blue-950/30
                      hover:bg-blue-100 dark:hover:bg-blue-950/50
                    `
                }
              `}
            >
              {/* HEADER CARD */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold truncate">{n.titulo}</h2>

                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 break-words">
                    {n.mensaje}
                  </p>
                </div>

                {!n.leida && (
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </div>

              {/* FECHA */}
              <div className="mt-3 text-right">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {n.fechaCreacion
                    ? new Date(n.fechaCreacion).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })
                    : 'Fecha no disponible'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTÓN MOBILE */}
      {sinLeer > 0 && (
        <button
          onClick={handleMarkAll}
          className="
            fixed bottom-20 right-5 z-50
            flex h-14 w-14 items-center justify-center
            rounded-full bg-blue-600 text-white
            shadow-xl shadow-blue-600/30
            hover:scale-105 active:scale-95
            sm:hidden
          "
        >
          <Check size={22} />
        </button>
      )}
    </div>
  )
}
