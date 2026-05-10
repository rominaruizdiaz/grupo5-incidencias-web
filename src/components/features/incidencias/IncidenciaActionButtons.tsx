import { UserPlus, RefreshCw } from 'lucide-react'

interface Props {
  puedeAsignar: boolean
  puedeSelfAsignar: boolean
  puedeReabrir: boolean
  estado: string
  esCreador: boolean
  esAsignado: boolean
  esAdmin: boolean
  loadingAsignar: boolean
  loadingReabrir: boolean
  onAsignar: () => void
  onSelfAsignar: () => void
  onReabrir: () => void
}

export const IncidenciaActionButtons = ({
  puedeAsignar,
  puedeSelfAsignar,
  puedeReabrir,
  estado,
  esCreador,
  esAsignado,
  esAdmin,
  loadingAsignar,
  loadingReabrir,
  onAsignar,
  onSelfAsignar,
  onReabrir,
}: Props) => {
  const mostrarBotones =
    puedeAsignar ||
    puedeSelfAsignar ||
    (estado === 'Resuelto' && (esCreador || esAsignado || esAdmin))

  if (!mostrarBotones) return null

  return (
    <div className="flex flex-wrap gap-3">
      {puedeAsignar && estado !== 'Resuelto' && (
        <button
          onClick={onAsignar}
          disabled={loadingAsignar}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
        >
          <UserPlus size={18} />
          Asignar Técnico
        </button>
      )}

      {puedeSelfAsignar && (
        <button
          onClick={onSelfAsignar}
          disabled={loadingAsignar}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition disabled:opacity-50 font-medium"
        >
          <UserPlus size={18} />
          Asignarme
        </button>
      )}

      {puedeReabrir && estado === 'Resuelto' && (
        <button
          onClick={onReabrir}
          disabled={loadingReabrir}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 font-medium"
        >
          <RefreshCw size={18} />
          Reabrir
        </button>
      )}
    </div>
  )
}
