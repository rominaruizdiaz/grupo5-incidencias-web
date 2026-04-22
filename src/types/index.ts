// roles del sistema
export enum UserRole {
  ADMIN = 1,
  PROFESOR = 2,
  TECNICO = 3,
}

export enum IncidenciaEstado {
  ACTIVO = 'Activo',
  EN_CURSO = 'En curso',
  RESUELTO = 'Resuelto',
}

export enum IncidenciaUrgencia {
  BAJA = 'Baja',
  MEDIA = 'Media',
  ALTA = 'Alta',
}

// entidades
export interface Usuario {
  id: number
  nombre: string
  email: string
  password?: string
  fotoPerfil?: string | null
  modoOscuro: boolean
  rol: UserRole
  fechaRegistro: string
}

export interface Incidencia {
  id: number
  titulo: string
  descripcion: string
  especialidad: string // quién la resuelve
  ubicacion: string // área afectada
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  fecha: string
  idReporta?: number | null
  idAsignado?: number | null
  fechaResolucion?: string | null
}

// DTO
export interface CreateIncidenciaRequest {
  titulo: string
  descripcion: string
  especialidad: string // quién la resuelve
  ubicacion: string // área afectada
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  idReporta: number
}

export interface Departamento {
  idDepartamento: number
  nombre: string
  fechaCreacion: string
}

export interface UsuarioDepartamento {
  id: number
  usuarioId: number
  idDepartamento: number
}

export interface PersonalFiltersState {
  departamentoId: number | null
  rol: UserRole | null
}

export interface PersonalTableRow extends Usuario {
  departamentos?: string[]
}

export type UsuarioWithDepartamentos = Usuario & {
  departamentos: number[]
}

// AUTH TYPES
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  nombre: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: Usuario
}
