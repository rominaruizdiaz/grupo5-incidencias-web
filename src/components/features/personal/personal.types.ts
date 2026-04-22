import type {
  Usuario,
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
  usuarios: Usuario[]
  departamentos: Departamento[]
  onEditUsuario: (usuario: Usuario) => void
  onDeleteUsuario: (usuario: Usuario) => void
  loading?: boolean
}

export interface PersonalCardProps {
  usuario: Usuario
  departamentos: Departamento[]
  onEdit: (usuario: Usuario) => void
  onDelete: (usuario: Usuario) => void
}

export interface PersonalModalProps {
  usuario: UsuarioWithDepartamentos | null
  departamentos: Departamento[]
  isOpen: boolean
  loading?: boolean
  onClose: () => void
  onSave: (
    usuario: UsuarioWithDepartamentos,
    departamentoIds: number[]
  ) => Promise<void>
}
