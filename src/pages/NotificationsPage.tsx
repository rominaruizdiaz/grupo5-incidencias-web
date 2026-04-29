import { useEffect, useState } from 'react'
import '../styles/NotificationsPage.css'
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
      <div className="page-wrapper flex items-center justify-center">
        <div className="page-content">
          <p className="text-slate-400">Cargando notificaciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <div className="page-header">
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
      <div className="page-content">
        <div>
          {notificaciones.length === 0 ? (
            <div className="page-card text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-slate-950 rounded-full">
                  <Bell size={32} className="text-slate-400" />
                </div>
              </div>
              <p className="text-slate-400 text-lg">No tienes notificaciones recientes</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notificaciones.map(notificacion => (
                <div
                  key={notificacion.id}
                  onClick={() => handleClickNotificacion(notificacion)}
                  className={`rounded-3xl border transition cursor-pointer ${
                    notificacion.leida
                      ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    {/* ICONO */}
                    <div
                      className={`p-3 rounded-2xl flex-shrink-0 ${
                        notificacion.leida
                          ? 'bg-slate-950'
                          : 'bg-blue-800/20'
                      }`}
                    >
                      <Bell
                        size={20}
                        className={
                          notificacion.leida ? 'text-slate-400' : 'text-blue-400'
                        }
                      />
                    </div>

                    {/* CONTENIDO */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className={`font-semibold ${
                            notificacion.leida ? 'text-slate-200' : 'text-white'
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
                          notificacion.leida ? 'text-slate-400' : 'text-slate-200'
                        }`}
                      >
                        {notificacion.mensaje}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
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
