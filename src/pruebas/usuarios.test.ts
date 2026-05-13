/**
 * Pruebas unitarias para src/utils/usuarios.ts
 *
 * Función: getNombreUsuario
 * Devuelve el nombre de un usuario buscándolo por ID.
 * Si no se encuentra o el ID es nulo, devuelve 'Desconocido'.
 */

import { describe, it, expect } from 'vitest'
import { getNombreUsuario } from '../utils/usuarios'
import type { Usuario } from '../types'
import { UserRole } from '../types'

const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: 'Ana García',
    email: 'ana@centro.es',
    modoOscuro: false,
    rol: UserRole.ADMIN,
    fechaRegistro: '2024-01-01',
  },
  {
    id: 2,
    nombre: 'Pedro López',
    email: 'pedro@centro.es',
    modoOscuro: true,
    rol: UserRole.TECNICO,
    fechaRegistro: '2024-02-15',
  },
  {
    id: 3,
    nombre: 'Marta Ruiz',
    email: 'marta@centro.es',
    modoOscuro: false,
    rol: UserRole.PROFESOR,
    fechaRegistro: '2024-03-10',
  },
]

describe('getNombreUsuario', () => {
  // --- casos de éxito ---

  it('devuelve el nombre correcto para un ID existente (número)', () => {
    expect(getNombreUsuario(usuarios, 1)).toBe('Ana García')
  })

  it('devuelve el nombre correcto para otro ID existente', () => {
    expect(getNombreUsuario(usuarios, 3)).toBe('Marta Ruiz')
  })

  it('acepta el ID como string numérico y lo convierte correctamente', () => {
    expect(getNombreUsuario(usuarios, '2')).toBe('Pedro López')
  })

  it('devuelve "Desconocido" si el ID es null', () => {
    expect(getNombreUsuario(usuarios, null)).toBe('Desconocido')
  })

  it('devuelve "Desconocido" si el ID es undefined', () => {
    expect(getNombreUsuario(usuarios, undefined)).toBe('Desconocido')
  })

  it('devuelve "Desconocido" si el ID no coincide con ningún usuario', () => {
    expect(getNombreUsuario(usuarios, 99)).toBe('Desconocido')
  })

  it('devuelve "Desconocido" si la lista de usuarios está vacía', () => {
    expect(getNombreUsuario([], 1)).toBe('Desconocido')
  })

  it('devuelve "Desconocido" si el ID es 0 (no existe)', () => {
    expect(getNombreUsuario(usuarios, 0)).toBe('Desconocido')
  })
})
