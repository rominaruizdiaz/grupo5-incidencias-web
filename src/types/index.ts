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
  idUsuario: number
  nombre: string
  email: string
  passwordHash?: string
  fotoPerfil?: string | null
  modoOscuro: boolean
  rol: UserRole
  fechaRegistro: string
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

// DTO
export interface CreateIncidenciaRequest {
  titulo: string
  descripcion: string
  categoria: string
  ubicacion: string
  estado: IncidenciaEstado
  urgencia: IncidenciaUrgencia
  idUsuarioReporta: number
}
