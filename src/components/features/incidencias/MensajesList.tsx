import { useMemo } from 'react'
import clsx from 'clsx'
import type { MensajeIncidencia } from '@/types'

interface MensajesListProps {
  mensajes: MensajeIncidencia[]
  getNombreUsuario: (idUsuario: number) => string
  usuarioActualId?: number
  loading?: boolean
}

export const MensajesList = ({
  mensajes,
  getNombreUsuario,
  usuarioActualId,
  loading,
}: MensajesListProps) => {
  const mensajesOrdenados = useMemo(() => {
    return [...mensajes].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    )
  }, [mensajes])

  const esMensajeSistema = (mensaje: string) =>
    [
      'cambió el estado',
      'asignó la incidencia',
      'desasignó la incidencia',
      'marcó como resuelto',
      'reabrió la incidencia',
    ].some(p => mensaje.includes(p))

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">Cargando mensajes...</div>
    )
  }

  return (
    <div
      className="
        flex flex-col-reverse
        gap-4 px-2
        overflow-y-auto
        h-full
      "
    >
      {mensajesOrdenados.map((msg, idx) => {
        const esMio = msg.idUsuario === usuarioActualId
        const sistema = esMensajeSistema(msg.mensaje)

        if (sistema) {
          return (
            <div key={msg.id || idx} className="flex justify-center">
              <div className="rounded-full bg-gray-200 px-4 py-2 text-xs text-gray-700">
                {msg.mensaje}
              </div>
            </div>
          )
        }

        return (
          <div
            key={msg.id || idx}
            className={clsx('flex', esMio ? 'justify-end' : 'justify-start')}
          >
            <div className="w-full max-w-[85%] sm:max-w-[70%]">
              <div
                className={clsx(
                  'mb-1 text-xs sm:text-sm font-medium text-gray-600',
                  esMio ? 'text-right' : 'text-left'
                )}
              >
                {getNombreUsuario(msg.idUsuario)}
              </div>

              <div
                className={clsx(
                  'rounded-2xl px-3 sm:px-4 py-2 sm:py-3 break-words',
                  esMio ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.mensaje}</p>

                <p className="mt-2 text-[10px] sm:text-xs opacity-70">
                  {new Date(msg.fecha).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
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
