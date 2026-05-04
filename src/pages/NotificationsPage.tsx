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
    if (usuario?.id) {
      refresh(usuario.id)
    }
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
      <div className="min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Centro de Avisos</h1>

        {sinLeer > 0 && (
          <button
            onClick={handleMarkAll}
            className="text-blue-600 flex items-center gap-2"
          >
            <Check size={18} />
            Marcar todas
          </button>
        )}
      </div>

      {/* LISTA */}
      <div className="p-6 space-y-3">
        {notificaciones.length === 0 ? (
          <p className="text-gray-500">Sin notificaciones</p>
        ) : (
          notificaciones.map(n => (
            <div
              key={n.id}
              onClick={() => handleClick(n)}
              className={`p-4 rounded-lg border cursor-pointer transition ${
                n.leida
                  ? 'bg-white'
                  : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{n.titulo}</span>

                {!n.leida && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>

              <p className="text-sm text-gray-600">{n.mensaje}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
