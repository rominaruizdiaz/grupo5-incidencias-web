import { useState, useMemo } from 'react'
import type { UsuarioWithDepartamentos, PersonalFiltersState } from '@/types'

export const usePersonalFilters = (usuarios: UsuarioWithDepartamentos[]) => {
  const [filters, setFilters] = useState<PersonalFiltersState>({
    rol: null,
    departamentoId: null,
  })

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter(u => {
      if (filters.rol !== null && u.rol !== filters.rol) return false

      if (
        filters.departamentoId !== null &&
        !u.departamentos.includes(filters.departamentoId)
      ) {
        return false
      }

      return true
    })
  }, [usuarios, filters])

  return {
    filters,
    setFilters,
    usuariosFiltrados,
    resetFilters: () => setFilters({ rol: null, departamentoId: null }),
  }
}
