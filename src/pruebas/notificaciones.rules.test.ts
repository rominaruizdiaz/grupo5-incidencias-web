/**
 * Pruebas unitarias para src/services/notificaciones.rules.ts
 *
 * Función: resolveDestinatarios
 * Dado un evento, una incidencia y la lista completa de usuarios,
 * devuelve los usuarios que deben recibir la notificación.
 */

import { describe, it, expect } from 'vitest'
import { resolveDestinatarios } from '../services/notificaciones.rules'
import { NotificationEvent } from '../services/notification.events'
import type { Incidencia, Usuario } from '../types'
import { UserRole, IncidenciaEstado, IncidenciaUrgencia } from '../types'


const admin: Usuario = {
  id: 1,
  nombre: 'Admin',
  email: 'admin@centro.es',
  modoOscuro: false,
  rol: UserRole.ADMIN,
  fechaRegistro: '2024-01-01',
}

const creador: Usuario = {
  id: 2,
  nombre: 'Creador',
  email: 'creador@centro.es',
  modoOscuro: false,
  rol: UserRole.PROFESOR,
  fechaRegistro: '2024-01-01',
}

const tecnico: Usuario = {
  id: 3,
  nombre: 'Técnico',
  email: 'tecnico@centro.es',
  modoOscuro: false,
  rol: UserRole.TECNICO,
  fechaRegistro: '2024-01-01',
}

const otroUsuario: Usuario = {
  id: 4,
  nombre: 'Otro',
  email: 'otro@centro.es',
  modoOscuro: false,
  rol: UserRole.PROFESOR,
  fechaRegistro: '2024-01-01',
}

const todosLosUsuarios: Usuario[] = [admin, creador, tecnico, otroUsuario]

const incidenciaAsignada: Incidencia = {
  id: 10,
  titulo: 'PC no arranca',
  descripcion: 'El equipo del aula 3 no enciende',
  categoria: 'Hardware',
  ubicacion: 'Aula 3',
  estado: IncidenciaEstado.EN_CURSO,
  urgencia: IncidenciaUrgencia.ALTA,
  fecha: '2024-05-01',
  idUsuarioReporta: creador.id,  // id=2
  idUsuarioAsignado: tecnico.id, // id=3
}

const incidenciaSinAsignar: Incidencia = {
  ...incidenciaAsignada,
  id: 11,
  idUsuarioAsignado: null,
}

const eventosCreadorAsignado = [
  NotificationEvent.MENSAJE_NUEVO,
  NotificationEvent.CAMBIO_ESTADO,
  NotificationEvent.ASIGNACION,
  NotificationEvent.RESOLUCION,
  NotificationEvent.REABRIR,
  NotificationEvent.CAMBIO_CAMPOS,
]

describe.each(eventosCreadorAsignado)(
  'resolveDestinatarios — evento %s',
  evento => {
    it('incluye al creador de la incidencia', () => {
      const resultado = resolveDestinatarios(evento, incidenciaAsignada, todosLosUsuarios)
      expect(resultado.map(u => u.id)).toContain(creador.id)
    })

    it('incluye al técnico asignado', () => {
      const resultado = resolveDestinatarios(evento, incidenciaAsignada, todosLosUsuarios)
      expect(resultado.map(u => u.id)).toContain(tecnico.id)
    })

    it('NO incluye a usuarios no relacionados con la incidencia', () => {
      const resultado = resolveDestinatarios(evento, incidenciaAsignada, todosLosUsuarios)
      expect(resultado.map(u => u.id)).not.toContain(otroUsuario.id)
    })

    it('devuelve exactamente 2 destinatarios cuando hay creador y asignado', () => {
      const resultado = resolveDestinatarios(evento, incidenciaAsignada, todosLosUsuarios)
      expect(resultado).toHaveLength(2)
    })

    it('devuelve solo el creador si no hay técnico asignado', () => {
      const resultado = resolveDestinatarios(evento, incidenciaSinAsignar, todosLosUsuarios)
      expect(resultado).toHaveLength(1)
      expect(resultado[0].id).toBe(creador.id)
    })
  }
)

describe('resolveDestinatarios — evento BORRADO', () => {
  it('incluye al admin', () => {
    const resultado = resolveDestinatarios(
      NotificationEvent.BORRADO,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado.map(u => u.id)).toContain(admin.id)
  })

  it('incluye al creador', () => {
    const resultado = resolveDestinatarios(
      NotificationEvent.BORRADO,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado.map(u => u.id)).toContain(creador.id)
  })

  it('incluye al técnico asignado', () => {
    const resultado = resolveDestinatarios(
      NotificationEvent.BORRADO,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado.map(u => u.id)).toContain(tecnico.id)
  })

  it('NO incluye a usuarios sin relación con la incidencia', () => {
    const resultado = resolveDestinatarios(
      NotificationEvent.BORRADO,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado.map(u => u.id)).not.toContain(otroUsuario.id)
  })

  it('devuelve exactamente 3 destinatarios (admin + creador + técnico)', () => {
    const resultado = resolveDestinatarios(
      NotificationEvent.BORRADO,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado).toHaveLength(3)
  })
})

describe('resolveDestinatarios — evento desconocido', () => {
  it('devuelve un array vacío para un evento no reconocido', () => {
    const resultado = resolveDestinatarios(
      'evento_inexistente' as NotificationEvent,
      incidenciaAsignada,
      todosLosUsuarios
    )
    expect(resultado).toEqual([])
  })
})
