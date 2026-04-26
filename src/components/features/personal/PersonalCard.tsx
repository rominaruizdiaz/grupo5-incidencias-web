import { ROLE_LABELS, ROLE_COLORS } from '@/utils/personal.constants'
import type { PersonalCardProps } from './personal.types'

export function PersonalCard({
  usuario,
  departamentos,
  onEdit,
  onDelete,
}: PersonalCardProps) {
  return (
    <div className="md:hidden bg-white rounded-lg shadow p-4 mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {usuario.nombre}
        </h3>
        <p className="text-sm text-gray-600">{usuario.email}</p>
      </div>

      <div className="mb-4 space-y-2">
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${ROLE_COLORS[usuario.rol]}`}
          >
            {ROLE_LABELS[usuario.rol]}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            <strong>Departamentos:</strong>{' '}
            {departamentos
              .filter(d =>
                (usuario as any).departamentos?.includes(d.id)
              )
              .map(d => d.nombre)
              .join(', ') || '-'}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(usuario)}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(usuario)}
          className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
