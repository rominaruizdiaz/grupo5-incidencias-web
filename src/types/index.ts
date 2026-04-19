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

// estructura de los objetos
export interface Usuario {
  idUsuario: number
  nombre: string
  email: string
  passwordHash?: string
  fotoPerfil?: string | null
  modoOscuro: boolean
  rol: UserRole
  fechaRegistro: string
}

export interface Departamento {
  idDepartamento: number
  nombre: string
  fechaCreacion: string
}

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

export interface Etiqueta {
  idEtiqueta: number
  nombre: string
}

// relaciones de los objetos
export interface UsuarioDepartamento {
  idUsuario: number
  idDepartamento: number
}

export interface UsuarioEtiqueta {
  idUsuario: number
  idEtiqueta: number
}

export interface MensajeIncidencia {
  idMensaje: number
  id: number
  idUsuario: number
  mensaje: string
  fecha: string
}

export interface Notificacion {
  idNotificacion: number
  idUsuarioDestino: number
  titulo: string
  mensaje: string
  leida: boolean
  fechaCreacion: string
  idVinculada?: number | null
}

// DTOs para requests
export interface LoginRequest {
  email: string
  password: string
}

export interface CreateIncidenciaRequest {
  titulo: string
  descripcion: string
  categoria: string
  ubicacion: string
  urgencia: IncidenciaUrgencia
  idUsuarioReporta: number
}
