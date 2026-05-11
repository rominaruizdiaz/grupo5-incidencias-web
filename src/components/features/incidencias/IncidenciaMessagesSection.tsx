import type { MensajeIncidencia } from '@/types'
import { MensajesList } from './MensajesList'
import { NuevoMensajeInput } from './NuevoMensajeInput'

interface Props {
  mensajes: MensajeIncidencia[]
  getNombreUsuario: (id: number) => string
  usuarioActualId?: number
  loading: boolean
  loadingEnviar: boolean
  onEnviarMensaje: (mensaje: string) => Promise<boolean>
}

export const IncidenciaMessagesSection = ({
  mensajes,
  getNombreUsuario,
  usuarioActualId,
  loading,
  loadingEnviar,
  onEnviarMensaje,
}: Props) => {
  return (
    <div className="mt-8 flex flex-col h-[60vh] md:h-[65vh] border-t border-slate-800 pt-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">
        Registro de Seguimiento
      </h3>

      <div className="flex-1 min-h-0 overflow-hidden">
        <MensajesList
          mensajes={mensajes}
          getNombreUsuario={getNombreUsuario}
          usuarioActualId={usuarioActualId}
          loading={loading}
        />
      </div>

      <div className="pt-3 bg-slate-900">
        <NuevoMensajeInput
          onEnviar={onEnviarMensaje}
          loading={loadingEnviar}
          disabled={false}
        />
      </div>
    </div>
  )
}
