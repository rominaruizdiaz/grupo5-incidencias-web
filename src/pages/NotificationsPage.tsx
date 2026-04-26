import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getNotificacionesPorUsuario, marcarComoLeida, marcarTodasComoLeidas } from '@/services/notificaciones'
import { type Notificacion } from '@/types'
import { Bell, Check, ChevronLeft } from 'lucide-react'

export const NotificationsPage = () => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (!usuario) return

      try {
        const data = await getNotificacionesPorUsuario(usuario.id)
        setNotificaciones(data.sort((a, b) =>
          new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
        ))
      } catch (err) {
        console.error('Error cargando notificaciones:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [usuario])

  const noLeidas = notificaciones.filter(n => !n.leida)
  const hayNoLeidas = noLeidas.length > 0

  const handleMarcarComoLeida = async (notificacion: Notificacion) => {
    if (!notificacion.leida) {
      try {
        await marcarComoLeida(notificacion.id!)
        setNotificaciones(prev =>
          prev.map(n => (n.id === notificacion.id ? { ...n, leida: true } : n))
        )
      } catch (err) {
        console.error('Error marcando como leída:', err)
      }
    }
  }

  const handleMarcarTodasLeidas = async () => {
    if (!usuario) return

    try {
      await marcarTodasComoLeidas(usuario.id)
      setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })))
    } catch (err) {
      console.error('Error marcando todas como leídas:', err)
    }
  }

  const handleClickNotificacion = async (notificacion: Notificacion) => {
    await handleMarcarComoLeida(notificacion)

    if (notificacion.idIncidenciaVinculada) {
      navigate(`/incidencia/${notificacion.idIncidenciaVinculada}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-500">Cargando notificaciones...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Centro de Avisos</h1>
              {notificaciones.length > 0 && (
                <p className="text-gray-600 text-sm mt-1">
                  {notificaciones.length} notificación{notificaciones.length !== 1 ? 'es' : ''}
                </p>
              )}
            </div>
          </div>

          {/* BOTÓN MARCAR TODAS COMO LEÍDAS */}
          {hayNoLeidas && (
            <button
              onClick={handleMarcarTodasLeidas}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition font-medium"
            >
              <Check size={18} />
              Marcar todas leídas
            </button>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {notificaciones.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Bell size={32} className="text-gray-400" />
                </div>
              </div>
              <p className="text-gray-500 text-lg">No tienes notificaciones recientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notificaciones.map(notificacion => (
                <div
                  key={notificacion.id}
                  onClick={() => handleClickNotificacion(notificacion)}
                  className={`rounded-lg border transition cursor-pointer ${
                    notificacion.leida
                      ? 'bg-white border-gray-200 hover:border-gray-300'
                      : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* ICONO */}
                    <div
                      className={`p-3 rounded-lg flex-shrink-0 ${
                        notificacion.leida
                          ? 'bg-gray-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      <Bell
                        size={20}
                        className={
                          notificacion.leida ? 'text-gray-400' : 'text-blue-600'
                        }
                      />
                    </div>

                    {/* CONTENIDO */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className={`font-semibold ${
                            notificacion.leida ? 'text-gray-700' : 'text-gray-900'
                          }`}
                        >
                          {notificacion.titulo}
                        </h3>
                        {!notificacion.leida && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>

                      <p
                        className={`text-sm mt-1 ${
                          notificacion.leida ? 'text-gray-600' : 'text-gray-700'
                        }`}
                      >
                        {notificacion.mensaje}
                      </p>

                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(notificacion.fechaCreacion).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    {/* ESTADO DE LECTURA */}
                    {notificacion.leida && (
                      <div className="flex-shrink-0 mt-1">
                        <Check size={20} className="text-green-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
