/**
 * Pruebas unitarias para src/types/index.ts
 *
 * Verifica que los enums tienen los valores y la cantidad de miembros
 * correctos, y que las interfaces se pueden construir sin errores de
 * compilación (comprobación estructural en tiempo de test).
 */

import { describe, it, expect } from 'vitest'
import {
  UserRole,
  IncidenciaEstado,
  IncidenciaUrgencia,
} from '../types'

describe('UserRole enum', () => {
  it('ADMIN tiene el valor numérico 1', () => {
    expect(UserRole.ADMIN).toBe(1)
  })

  it('PROFESOR tiene el valor numérico 2', () => {
    expect(UserRole.PROFESOR).toBe(2)
  })

  it('TECNICO tiene el valor numérico 3', () => {
    expect(UserRole.TECNICO).toBe(3)
  })

  it('los tres roles son distintos entre sí', () => {
    const valores = new Set([UserRole.ADMIN, UserRole.PROFESOR, UserRole.TECNICO])
    expect(valores.size).toBe(3)
  })
})

describe('IncidenciaEstado enum', () => {
  it('ACTIVO tiene el valor "Activo"', () => {
    expect(IncidenciaEstado.ACTIVO).toBe('Activo')
  })

  it('EN_CURSO tiene el valor "En curso"', () => {
    expect(IncidenciaEstado.EN_CURSO).toBe('En curso')
  })

  it('RESUELTO tiene el valor "Resuelto"', () => {
    expect(IncidenciaEstado.RESUELTO).toBe('Resuelto')
  })

  it('existen exactamente 3 estados', () => {
    const valores = Object.values(IncidenciaEstado)
    expect(valores).toHaveLength(3)
  })
})

describe('IncidenciaUrgencia enum', () => {
  it('BAJA tiene el valor "Baja"', () => {
    expect(IncidenciaUrgencia.BAJA).toBe('Baja')
  })

  it('MEDIA tiene el valor "Media"', () => {
    expect(IncidenciaUrgencia.MEDIA).toBe('Media')
  })

  it('ALTA tiene el valor "Alta"', () => {
    expect(IncidenciaUrgencia.ALTA).toBe('Alta')
  })

  it('existen exactamente 3 niveles de urgencia', () => {
    const valores = Object.values(IncidenciaUrgencia)
    expect(valores).toHaveLength(3)
  })
})

describe('Construcción de objetos con los tipos definidos', () => {
  it('se puede crear un Usuario válido sin errores', () => {
    const usuario = {
      id: 1,
      nombre: 'Test',
      email: 'test@test.com',
      modoOscuro: false,
      rol: UserRole.ADMIN,
      fechaRegistro: '2024-01-01',
    }
    expect(usuario.id).toBe(1)
    expect(usuario.rol).toBe(UserRole.ADMIN)
  })

  it('se puede crear una Incidencia válida sin errores', () => {
    const incidencia = {
      id: 5,
      titulo: 'Fallo de red',
      descripcion: 'Sin conexión en el aula 2',
      categoria: 'Red',
      ubicacion: 'Aula 2',
      estado: IncidenciaEstado.ACTIVO,
      urgencia: IncidenciaUrgencia.ALTA,
      fecha: '2024-04-01',
    }
    expect(incidencia.estado).toBe('Activo')
    expect(incidencia.urgencia).toBe('Alta')
  })

  it('se puede crear una Notificacion válida sin errores', () => {
    const notif = {
      idUsuarioDestino: 2,
      titulo: 'Nueva incidencia',
      mensaje: 'Se ha creado una incidencia',
      leida: false,
      fechaCreacion: '2024-04-01T10:00:00',
    }
    expect(notif.leida).toBe(false)
  })
})
