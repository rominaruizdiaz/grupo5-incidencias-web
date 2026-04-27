import { MensajeIncidencia } from '@/types'

interface MensajesListProps {
  mensajes: MensajeIncidencia[]
  getNombreUsuario: (idUsuario?: number) => string
  usuarioActualId?: number
  loading?: boolean
}

export const MensajesList = ({
  mensajes,
  getNombreUsuario,
  usuarioActualId,
  loading,
}: MensajesListProps) => {
  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando mensajes...</div>
  }

  if (mensajes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No hay mensajes aún. Escribe para iniciar el seguimiento.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {mensajes.map((msg, idx) => {
        const esMio = msg.idUsuario === usuarioActualId
        const alineacion = esMio ? 'flex-end' : 'flex-start'
        const colorFondo = esMio
          ? 'bg-blue-100 text-blue-900'
          : 'bg-gray-100 text-gray-900'
        const alineacionTexto = esMio ? 'text-right' : 'text-left'

        return (
          <div key={msg.id || idx} className={`flex ${alineacion}`}>
            <div className="max-w-xs">
              <div className={`text-sm font-medium text-gray-600 ${alineacionTexto} mb-1`}>
                {getNombreUsuario(msg.idUsuario)}
              </div>
              <div
                className={`${colorFondo} rounded-lg px-4 py-2 break-words`}
              >
                <p className="text-sm">{msg.mensaje}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {new Date(msg.fecha).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
