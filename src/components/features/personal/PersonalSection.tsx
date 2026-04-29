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
      <div className="page-card text-center">
        <p className="text-slate-400">No hay usuarios para mostrar</p>
      </div>
    )
  }

  return (
    <div className="hidden md:block page-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-950 border-b border-slate-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
              Nombre
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
              Rol
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
              Departamentos
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {usuarios.map(usuario => (
            <tr key={usuario.id} className="hover:bg-slate-900">
              <td className="px-6 py-4 text-sm text-slate-100">
                {usuario.nombre}
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">
                {usuario.email}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${ROLE_COLORS[usuario.rol]}`}
                >
                  {ROLE_LABELS[usuario.rol]}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">
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
