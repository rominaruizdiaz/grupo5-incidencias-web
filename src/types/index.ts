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

// ================= ETIQUETAS =================

export interface Etiqueta {
  id?: number
  nombre: string
}

// ================= INCIDENCIAS =================

export interface Incidencia {
  id: number
  titulo: string
  descripcion: string
  categoria: string
  ubicacion: string
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  fecha: string
  idUsuarioReporta?: number | null
  idUsuarioAsignado?: number | null
  fechaResolucion?: string | null
}

export interface CreateIncidenciaRequest {
  titulo: string
  descripcion: string
  categoria: string
  ubicacion: string
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  idUsuarioReporta: number
}

// ================= DEPARTAMENTOS =================

export interface Departamento {
  id?: number
  nombre: string
  fechaCreacion?: string
}

export interface UsuarioDepartamento {
  id?: number
  usuarioId: number
  departamentoId: number
}
// ================= NOTIFICACIONES =================

export interface Notificacion {
  id?: number
  idUsuarioDestino: number
  titulo: string
  mensaje: string
  leida: boolean
  fechaCreacion: string
  fechaEnvio?: string
  idIncidenciaVinculada?: number | null
  tipoEvento?: string
}

// ================= MENSAJES =================

export interface MensajeIncidencia {
  id?: number
  idIncidencia: number
  idUsuario: number
  mensaje: string
  fecha: string
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
