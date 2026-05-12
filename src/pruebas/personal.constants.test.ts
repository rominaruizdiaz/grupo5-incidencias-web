/**
 * Pruebas unitarias para src/utils/personal.constants.ts
 *
 * Verifica ROLE_LABELS, ROLE_COLORS y ROLE_OPTIONS.
 */

import { describe, it, expect } from 'vitest'
import {
  ROLE_LABELS,
  ROLE_COLORS,
  ROLE_OPTIONS,
} from '../utils/personal.constants'
import { UserRole } from '../types'

describe('ROLE_LABELS', () => {
  it('asigna "Administrador" al rol ADMIN', () => {
    expect(ROLE_LABELS[UserRole.ADMIN]).toBe('Administrador')
  })

  it('asigna "Profesor" al rol PROFESOR', () => {
    expect(ROLE_LABELS[UserRole.PROFESOR]).toBe('Profesor')
  })

  it('asigna "Técnico" al rol TECNICO', () => {
    expect(ROLE_LABELS[UserRole.TECNICO]).toBe('Técnico')
  })

  it('contiene exactamente 3 entradas', () => {
    expect(Object.keys(ROLE_LABELS)).toHaveLength(3)
  })
})

describe('ROLE_COLORS', () => {
  it('asigna clases de color rojo al rol ADMIN', () => {
    expect(ROLE_COLORS[UserRole.ADMIN]).toContain('red')
  })

  it('asigna clases de color azul al rol PROFESOR', () => {
    expect(ROLE_COLORS[UserRole.PROFESOR]).toContain('blue')
  })

  it('asigna clases de color verde al rol TECNICO', () => {
    expect(ROLE_COLORS[UserRole.TECNICO]).toContain('green')
  })

  it('todos los valores son cadenas no vacías', () => {
    Object.values(ROLE_COLORS).forEach(color => {
      expect(typeof color).toBe('string')
      expect(color.length).toBeGreaterThan(0)
    })
  })
})

describe('ROLE_OPTIONS', () => {
  it('genera exactamente 3 opciones', () => {
    expect(ROLE_OPTIONS).toHaveLength(3)
  })

  it('cada opción tiene las propiedades "value" y "label"', () => {
    ROLE_OPTIONS.forEach(option => {
      expect(option).toHaveProperty('value')
      expect(option).toHaveProperty('label')
    })
  })

  it('los valores numéricos corresponden a los enums de UserRole', () => {
    const valores = ROLE_OPTIONS.map(o => o.value)
    expect(valores).toContain(UserRole.ADMIN)
    expect(valores).toContain(UserRole.PROFESOR)
    expect(valores).toContain(UserRole.TECNICO)
  })

  it('las etiquetas coinciden con ROLE_LABELS', () => {
    ROLE_OPTIONS.forEach(option => {
      expect(option.label).toBe(ROLE_LABELS[option.value])
    })
  })
})
