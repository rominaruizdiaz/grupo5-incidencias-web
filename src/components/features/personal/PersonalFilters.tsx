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
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtro por Rol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
          >
            <option value="">Todos los roles</option>
            {ROLE_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Departamento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
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
