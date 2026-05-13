/**
 * Pruebas unitarias para src/utils/constants.ts
 */

import { describe, it, expect } from 'vitest'
import {
  ROLES,
  CATEGORIAS_DEFECTO,
  COLOR_URGENCIA,
  COLOR_ESTADO,
} from '../utils/constants'
import { UserRole, IncidenciaUrgencia, IncidenciaEstado } from '../types'

describe('ROLES', () => {
  it('devuelve "Administración" para UserRole.ADMIN', () => {
    expect(ROLES[UserRole.ADMIN]).toBe('Administración')
  })

  it('devuelve "Profesorado" para UserRole.PROFESOR', () => {
    expect(ROLES[UserRole.PROFESOR]).toBe('Profesorado')
  })

  it('devuelve "Técnico/Mantenimiento" para UserRole.TECNICO', () => {
    expect(ROLES[UserRole.TECNICO]).toBe('Técnico/Mantenimiento')
  })

  it('contiene exactamente 3 entradas (una por rol)', () => {
    expect(Object.keys(ROLES)).toHaveLength(3)
  })
})

describe('CATEGORIAS_DEFECTO', () => {
  it('incluye la categoría "Hardware"', () => {
    expect(CATEGORIAS_DEFECTO).toContain('Hardware')
  })

  it('incluye la categoría "Software"', () => {
    expect(CATEGORIAS_DEFECTO).toContain('Software')
  })

  it('incluye la categoría "Red"', () => {
    expect(CATEGORIAS_DEFECTO).toContain('Red')
  })

  it('incluye la categoría "Otro"', () => {
    expect(CATEGORIAS_DEFECTO).toContain('Otro')
  })

  it('contiene exactamente 4 categorías', () => {
    expect(CATEGORIAS_DEFECTO).toHaveLength(4)
  })
})

describe('COLOR_URGENCIA', () => {
  it('asigna clases de color para urgencia ALTA', () => {
    expect(COLOR_URGENCIA[IncidenciaUrgencia.ALTA]).toContain('fuchsia')
  })

  it('asigna clases de color para urgencia MEDIA', () => {
    expect(COLOR_URGENCIA[IncidenciaUrgencia.MEDIA]).toContain('amber')
  })

  it('asigna clases de color para urgencia BAJA', () => {
    expect(COLOR_URGENCIA[IncidenciaUrgencia.BAJA]).toContain('cyan')
  })

  it('todos los valores incluyen "text-white"', () => {
    Object.values(COLOR_URGENCIA).forEach(clase => {
      expect(clase).toContain('text-white')
    })
  })

  it('contiene exactamente 3 entradas (una por nivel de urgencia)', () => {
    expect(Object.keys(COLOR_URGENCIA)).toHaveLength(3)
  })
})

describe('COLOR_ESTADO', () => {
  it('asigna clases de color para estado ACTIVO', () => {
    expect(COLOR_ESTADO[IncidenciaEstado.ACTIVO]).toContain('red')
  })

  it('asigna clases de color para estado EN_CURSO', () => {
    expect(COLOR_ESTADO[IncidenciaEstado.EN_CURSO]).toContain('orange')
  })

  it('asigna clases de color para estado RESUELTO', () => {
    expect(COLOR_ESTADO[IncidenciaEstado.RESUELTO]).toContain('green')
  })

  it('todos los valores incluyen "text-white"', () => {
    Object.values(COLOR_ESTADO).forEach(clase => {
      expect(clase).toContain('text-white')
    })
  })

  it('contiene exactamente 3 entradas (una por estado)', () => {
    expect(Object.keys(COLOR_ESTADO)).toHaveLength(3)
  })
})
