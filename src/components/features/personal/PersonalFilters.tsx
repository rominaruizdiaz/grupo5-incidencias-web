import type { PersonalFiltersProps } from './personal.types'
import { ROLE_OPTIONS } from '@/utils/personal.constants'
import { UserRole } from '@/types'

export function PersonalFilters({
  filters,
  departamentos,
  onFilterChange,
  loading,
}: PersonalFiltersProps) {
  return (
    <div
      className="
        rounded-3xl border border-slate-200
        bg-white p-4 shadow-sm
        dark:border-slate-800 dark:bg-slate-900
        sm:p-6
      "
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* FILTRO ROL */}
        <div className="space-y-2">
          <label
            className="
              block text-sm font-semibold
              text-slate-900 dark:text-slate-200
            "
          >
            Filtrar por Rol
          </label>

          <select
            value={filters.rol ?? ''}
            onChange={e =>
              onFilterChange({
                ...filters,
                rol: e.target.value
                  ? (parseInt(e.target.value) as UserRole)
                  : null,
              })
            }
            disabled={loading}
            className="
              w-full rounded-2xl border
              border-slate-200 bg-slate-50
              px-4 py-3 text-sm font-medium
              text-slate-900 outline-none transition

              hover:border-slate-300
              focus:border-blue-500
              focus:bg-white

              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-slate-700
              dark:bg-slate-950
              dark:text-slate-100
              dark:hover:border-slate-600
              dark:focus:border-blue-500
            "
          >
            <option value="">Todos los roles</option>

            {ROLE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRO DEPARTAMENTO */}
        <div className="space-y-2">
          <label
            className="
              block text-sm font-semibold
              text-slate-900 dark:text-slate-200
            "
          >
            Filtrar por Departamento
          </label>

          <select
            value={filters.departamentoId ?? ''}
            onChange={e =>
              onFilterChange({
                ...filters,
                departamentoId: e.target.value
                  ? parseInt(e.target.value)
                  : null,
              })
            }
            disabled={loading}
            className="
              w-full rounded-2xl border
              border-slate-200 bg-slate-50
              px-4 py-3 text-sm font-medium
              text-slate-900 outline-none transition

              hover:border-slate-300
              focus:border-blue-500
              focus:bg-white

              disabled:cursor-not-allowed
              disabled:opacity-60

              dark:border-slate-700
              dark:bg-slate-950
              dark:text-slate-100
              dark:hover:border-slate-600
              dark:focus:border-blue-500
            "
          >
            <option value="">Todos los departamentos</option>

            {departamentos.map(depto => (
              <option key={depto.id} value={depto.id}>
                {depto.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
