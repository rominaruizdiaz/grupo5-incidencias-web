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

// ================= USERS =================

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

export interface UsuarioWithDepartamentos extends Usuario {
  departamentos: number[]
}

// ================= INCIDENCIAS =================

export interface Incidencia {
  id: number
  titulo: string
  descripcion: string
  especialidad: string
  ubicacion: string
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  fecha: string
  idReporta?: number | null
  idAsignado?: number | null
  fechaResolucion?: string | null
}

export interface CreateIncidenciaRequest {
  titulo: string
  descripcion: string
  especialidad: string
  ubicacion: string
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  idReporta: number
}

// ================= DEPARTAMENTOS =================

export interface Departamento {
  id?: number
  nombre: string
}

export interface UsuarioDepartamento {
  id?: number
  usuarioId: number
  departamentoId: number
}

// ================= FILTROS =================

export interface PersonalFiltersState {
  rol: UserRole | null
  departamentoId: number | null
}

// ================= AUTH =================

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
  accessToken: string
  user: Usuario
}
