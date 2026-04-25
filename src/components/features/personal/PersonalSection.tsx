import { ROLE_LABELS, ROLE_COLORS } from '@/utils/personal.constants'
import type { PersonalTableProps } from './personal.types'

export function PersonalSection({
  usuarios,
  departamentos,
  onEditUsuario,
  onDeleteUsuario,
  loading,
}: PersonalTableProps) {
  if (usuarios.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No hay usuarios para mostrar</p>
      </div>
    )
  }

  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Departamentos
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {usuarios.map(usuario => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {usuario.nombre}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {usuario.email}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${ROLE_COLORS[usuario.rol]}`}
                >
                  {ROLE_LABELS[usuario.rol]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {departamentos
                  .filter(d =>
                    (usuario as any).departamentos?.includes(d.id)
                  )
                  .map(d => d.nombre)
                  .join(', ') || '-'}
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <button
                  onClick={() => onEditUsuario(usuario)}
                  disabled={loading}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDeleteUsuario(usuario)}
                  disabled={loading}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
