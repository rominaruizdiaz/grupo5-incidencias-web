import { ROLE_LABELS, ROLE_COLORS } from '@/utils/personal.constants'
import type { PersonalTableProps } from './personal.types'
import { Edit2, Trash2 } from 'lucide-react'

export function PersonalSection({
  usuarios,
  departamentos,
  onEditUsuario,
  onDeleteUsuario,
  loading,
}: PersonalTableProps) {
  if (usuarios.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-950">
        <p className="text-slate-600 dark:text-slate-400">
          No hay usuarios para mostrar
        </p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse">
        {/* HEADER */}
        <thead className="bg-slate-50 border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
          <tr>
            <th className="w-[35%] px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
              Nombre
            </th>

            <th className="w-[20%] px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
              Rol
            </th>

            <th className="w-[30%] px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
              Departamentos
            </th>

            <th className="w-[15%] px-4 py-3 text-left text-sm font-medium text-slate-700 dark:text-slate-300">
              Acciones
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {usuarios.map(usuario => (
            <tr
              key={usuario.id}
              className="hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              {/* NOMBRE */}
              <td className="px-4 py-3 text-sm font-medium break-words text-slate-900 dark:text-slate-100">
                {usuario.nombre}
              </td>

              {/* ROL */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[usuario.rol]}`}
                >
                  {ROLE_LABELS[usuario.rol]}
                </span>
              </td>

              {/* DEPARTAMENTOS */}
              <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 break-words">
                {departamentos
                  .filter(d => (usuario as any).departamentos?.includes(d.id))
                  .map(d => d.nombre)
                  .join(', ') || '-'}
              </td>

              {/* ACCIONES */}
              <td className="px-4 py-3">
                <div className="flex flex-col items-stretch gap-2">
                  <button
                    onClick={() => onEditUsuario(usuario)}
                    disabled={loading}
                    className="flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => onDeleteUsuario(usuario)}
                    disabled={loading}
                    className="flex items-center justify-center p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
