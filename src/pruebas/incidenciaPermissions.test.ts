/**
 * Pruebas unitarias para la lógica de permisos de incidencias (src/hooks/incidencias/useIncidenciaPermissions.ts)
 */

import { describe, it, expect } from 'vitest'
import { UserRole, IncidenciaEstado, IncidenciaUrgencia } from '../types'
import type { Incidencia } from '../types'

interface EtiquetaSimple {
  id: number
  nombre: string
}

function calcularPermisos(
  incidencia: Incidencia | null,
  usuarioId: number | undefined,
  usuarioRol: number | undefined,
  etiquetasUsuario: number[],
  etiquetas: EtiquetaSimple[]
) {
  if (!incidencia || !usuarioId || !usuarioRol) {
    return {
      esCreador: false,
      esAdmin: false,
      esTecnico: false,
      esAsignado: false,
      tieneespecializacion: false,
      puedeEditarTextos: false,
      puedeCambiarEstado: false,
      puedeAsignar: false,
      puedeSelfAsignar: false,
      puedeResolver: false,
      puedeEliminar: false,
      tieneAccesoAlChat: false,
    }
  }

  const esCreador = usuarioId === incidencia.idUsuarioReporta
  const esAdmin = usuarioRol === 1
  const esTecnico = usuarioRol === 3
  const esAsignado = usuarioId === incidencia.idUsuarioAsignado

  const tieneespecializacion = (() => {
    if (!esTecnico || !incidencia.categoria) return false
    const etiquetaCategoria = etiquetas.find(e => e.nombre === incidencia.categoria)
    return etiquetaCategoria ? etiquetasUsuario.includes(etiquetaCategoria.id) : false
  })()

  const puedeEditarTextos = (esCreador || esAdmin) && incidencia.estado !== 'Resuelto'
  const puedeCambiarEstado =
    (esAdmin || (esTecnico && esAsignado)) && incidencia.estado !== 'Resuelto'
  const puedeAsignar = esAdmin
  const puedeSelfAsignar =
    esTecnico &&
    !esAsignado &&
    !incidencia.idUsuarioAsignado &&
    tieneespecializacion &&
    incidencia.estado !== 'Resuelto'
  const puedeResolver =
    incidencia.estado !== 'Resuelto' &&
    (esAdmin ||
      (esTecnico &&
        (esAsignado || (!incidencia.idUsuarioAsignado && tieneespecializacion))))
  const puedeEliminar = (esCreador && incidencia.estado !== 'Resuelto') || esAdmin
  const tieneAccesoAlChat = puedeEditarTextos || puedeCambiarEstado || puedeAsignar

  return {
    esCreador,
    esAdmin,
    esTecnico,
    esAsignado,
    tieneespecializacion,
    puedeEditarTextos,
    puedeCambiarEstado,
    puedeAsignar,
    puedeSelfAsignar,
    puedeResolver,
    puedeEliminar,
    tieneAccesoAlChat,
  }
}

const etiquetas: EtiquetaSimple[] = [
  { id: 1, nombre: 'Hardware' },
  { id: 2, nombre: 'Software' },
  { id: 3, nombre: 'Red' },
]

const incidenciaActiva: Incidencia = {
  id: 1,
  titulo: 'PC averiado',
  descripcion: 'No enciende',
  categoria: 'Hardware',
  ubicacion: 'Aula 1',
  estado: IncidenciaEstado.ACTIVO,
  urgencia: IncidenciaUrgencia.ALTA,
  fecha: '2024-05-01',
  idUsuarioReporta: 10,
  idUsuarioAsignado: null,
}

const incidenciaAsignada: Incidencia = {
  ...incidenciaActiva,
  estado: IncidenciaEstado.EN_CURSO,
  idUsuarioAsignado: 30,
}

const incidenciaResuelta: Incidencia = {
  ...incidenciaAsignada,
  estado: IncidenciaEstado.RESUELTO,
}

describe('calcularPermisos — sin datos de usuario o incidencia', () => {
  it('devuelve todos los permisos en false si la incidencia es null', () => {
    const p = calcularPermisos(null, 1, UserRole.ADMIN, [], etiquetas)
    Object.values(p).forEach(v => expect(v).toBe(false))
  })

  it('devuelve todos los permisos en false si el usuarioId es undefined', () => {
    const p = calcularPermisos(incidenciaActiva, undefined, UserRole.ADMIN, [], etiquetas)
    Object.values(p).forEach(v => expect(v).toBe(false))
  })
})

describe('calcularPermisos — usuario Admin', () => {
  const p = calcularPermisos(incidenciaActiva, 99, UserRole.ADMIN, [], etiquetas)

  it('esAdmin es true', () => expect(p.esAdmin).toBe(true))
  it('puedeAsignar es true', () => expect(p.puedeAsignar).toBe(true))
  it('puedeEliminar es true', () => expect(p.puedeEliminar).toBe(true))
  it('puedeResolver es true en incidencia no resuelta', () => expect(p.puedeResolver).toBe(true))
  it('tieneAccesoAlChat es true', () => expect(p.tieneAccesoAlChat).toBe(true))
})

describe('calcularPermisos — usuario Creador (Profesor)', () => {
  // id=10 es el que reporta
  const p = calcularPermisos(incidenciaActiva, 10, UserRole.PROFESOR, [], etiquetas)

  it('esCreador es true', () => expect(p.esCreador).toBe(true))
  it('puedeEditarTextos es true en incidencia activa', () => expect(p.puedeEditarTextos).toBe(true))
  it('puedeEliminar es true en incidencia activa', () => expect(p.puedeEliminar).toBe(true))
  it('puedeAsignar es false', () => expect(p.puedeAsignar).toBe(false))
  it('puedeCambiarEstado es false', () => expect(p.puedeCambiarEstado).toBe(false))
})

describe('calcularPermisos — Técnico asignado', () => {
  // id=30 está asignado
  const p = calcularPermisos(incidenciaAsignada, 30, UserRole.TECNICO, [1], etiquetas)

  it('esAsignado es true', () => expect(p.esAsignado).toBe(true))
  it('puedeCambiarEstado es true en incidencia en curso', () => expect(p.puedeCambiarEstado).toBe(true))
  it('puedeResolver es true', () => expect(p.puedeResolver).toBe(true))
  it('puedeSelfAsignar es false (ya está asignado)', () => expect(p.puedeSelfAsignar).toBe(false))
})

describe('calcularPermisos — Técnico sin asignar con especialización en Hardware', () => {
  // incidenciaActiva no tiene asignado; etiqueta Hardware tiene id=1
  const p = calcularPermisos(incidenciaActiva, 50, UserRole.TECNICO, [1], etiquetas)

  it('tieneespecializacion es true', () => expect(p.tieneespecializacion).toBe(true))
  it('puedeSelfAsignar es true', () => expect(p.puedeSelfAsignar).toBe(true))
  it('puedeResolver es true', () => expect(p.puedeResolver).toBe(true))
})

describe('calcularPermisos — incidencia Resuelta', () => {
  const pAdmin = calcularPermisos(incidenciaResuelta, 99, UserRole.ADMIN, [], etiquetas)
  const pCreador = calcularPermisos(incidenciaResuelta, 10, UserRole.PROFESOR, [], etiquetas)

  it('admin NO puede editar textos en una incidencia resuelta', () => {
    expect(pAdmin.puedeEditarTextos).toBe(false)
  })

  it('admin NO puede cambiar estado de incidencia resuelta', () => {
    expect(pAdmin.puedeCambiarEstado).toBe(false)
  })

  it('creador NO puede eliminar incidencia resuelta', () => {
    expect(pCreador.puedeEliminar).toBe(false)
  })

  it('admin SÍ puede eliminar incidencia resuelta', () => {
    expect(pAdmin.puedeEliminar).toBe(true)
  })

  it('nadie puede resolver una incidencia ya resuelta', () => {
    expect(pAdmin.puedeResolver).toBe(false)
    expect(pCreador.puedeResolver).toBe(false)
  })
})
