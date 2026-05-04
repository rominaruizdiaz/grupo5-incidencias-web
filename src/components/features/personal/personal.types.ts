import type {
  Departamento,
  PersonalFiltersState,
  UsuarioWithDepartamentos,
} from '@/types'

export interface PersonalFiltersProps {
  filters: PersonalFiltersState
  departamentos: Departamento[]
  onFilterChange: (filters: PersonalFiltersState) => void
  loading?: boolean
}

export interface PersonalTableProps {
  usuarios: UsuarioWithDepartamentos[]
  departamentos: Departamento[]
  onEditUsuario: (usuario: UsuarioWithDepartamentos) => void
  onDeleteUsuario: (usuario: UsuarioWithDepartamentos) => void
  loading?: boolean
}

export interface PersonalCardProps {
  usuario: UsuarioWithDepartamentos
  departamentos: Departamento[]
  onEdit: (usuario: UsuarioWithDepartamentos) => void
  onDelete: (usuario: UsuarioWithDepartamentos) => void
}

export interface PersonalModalProps {
  usuario: UsuarioWithDepartamentos | null
  departamentos: Departamento[]
  isOpen: boolean
  loading?: boolean
  onClose: () => void
  onSave: (
    usuario: UsuarioWithDepartamentos,
    departamentos: number[],
    etiquetas?: number[]
  ) => Promise<void>
}
