/**
 * Pruebas unitarias para src/utils/incidenciaOptions.ts
 *
 * Verifica que URGENCIA_OPTIONS contiene todos los niveles del enum.
 */

import { describe, it, expect } from 'vitest'
import { URGENCIA_OPTIONS } from '../utils/incidenciaOptions'
import { IncidenciaUrgencia } from '../types'

describe('URGENCIA_OPTIONS', () => {
  it('contiene exactamente 3 opciones', () => {
    expect(URGENCIA_OPTIONS).toHaveLength(3)
  })

  it('incluye la urgencia BAJA', () => {
    expect(URGENCIA_OPTIONS).toContain(IncidenciaUrgencia.BAJA)
  })

  it('incluye la urgencia MEDIA', () => {
    expect(URGENCIA_OPTIONS).toContain(IncidenciaUrgencia.MEDIA)
  })

  it('incluye la urgencia ALTA', () => {
    expect(URGENCIA_OPTIONS).toContain(IncidenciaUrgencia.ALTA)
  })

  it('todos los elementos son strings no vacíos', () => {
    URGENCIA_OPTIONS.forEach(opcion => {
      expect(typeof opcion).toBe('string')
      expect(opcion.length).toBeGreaterThan(0)
    })
  })

  it('no contiene duplicados', () => {
    const conjunto = new Set(URGENCIA_OPTIONS)
    expect(conjunto.size).toBe(URGENCIA_OPTIONS.length)
  })
})
