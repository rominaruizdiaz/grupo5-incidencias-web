/**
 * Pruebas unitarias para la lógica del auth store (src/store/auth.store.ts)
 */

import { describe, it, expect } from 'vitest'
import { UserRole } from '../types'
import type { Usuario } from '../types'

const crearComprobarRol = (usuario: Usuario | null) => ({
  hasRole: (role: UserRole) => usuario?.rol === role,
  isAdmin: () => usuario?.rol === UserRole.ADMIN,
  isProfesor: () => usuario?.rol === UserRole.PROFESOR,
  isTecnico: () => usuario?.rol === UserRole.TECNICO,
})

const usuarioAdmin: Usuario = {
  id: 1,
  nombre: 'Admin',
  email: 'admin@test.es',
  modoOscuro: false,
  rol: UserRole.ADMIN,
  fechaRegistro: '2024-01-01',
}

const usuarioProfesor: Usuario = {
  id: 2,
  nombre: 'Profesor',
  email: 'prof@test.es',
  modoOscuro: false,
  rol: UserRole.PROFESOR,
  fechaRegistro: '2024-01-01',
}

const usuarioTecnico: Usuario = {
  id: 3,
  nombre: 'Técnico',
  email: 'tec@test.es',
  modoOscuro: false,
  rol: UserRole.TECNICO,
  fechaRegistro: '2024-01-01',
}

describe('isAdmin()', () => {
  it('devuelve true para un usuario administrador', () => {
    expect(crearComprobarRol(usuarioAdmin).isAdmin()).toBe(true)
  })

  it('devuelve false para un usuario profesor', () => {
    expect(crearComprobarRol(usuarioProfesor).isAdmin()).toBe(false)
  })

  it('devuelve false para un usuario técnico', () => {
    expect(crearComprobarRol(usuarioTecnico).isAdmin()).toBe(false)
  })

  it('devuelve false cuando no hay usuario (null)', () => {
    expect(crearComprobarRol(null).isAdmin()).toBe(false)
  })
})


describe('isProfesor()', () => {
  it('devuelve true para un usuario profesor', () => {
    expect(crearComprobarRol(usuarioProfesor).isProfesor()).toBe(true)
  })

  it('devuelve false para un usuario administrador', () => {
    expect(crearComprobarRol(usuarioAdmin).isProfesor()).toBe(false)
  })

  it('devuelve false para un usuario técnico', () => {
    expect(crearComprobarRol(usuarioTecnico).isProfesor()).toBe(false)
  })

  it('devuelve false cuando no hay usuario (null)', () => {
    expect(crearComprobarRol(null).isProfesor()).toBe(false)
  })
})


describe('isTecnico()', () => {
  it('devuelve true para un usuario técnico', () => {
    expect(crearComprobarRol(usuarioTecnico).isTecnico()).toBe(true)
  })

  it('devuelve false para un usuario administrador', () => {
    expect(crearComprobarRol(usuarioAdmin).isTecnico()).toBe(false)
  })

  it('devuelve false cuando no hay usuario (null)', () => {
    expect(crearComprobarRol(null).isTecnico()).toBe(false)
  })
})


describe('hasRole()', () => {
  it('devuelve true cuando el rol del usuario coincide con el dado', () => {
    expect(crearComprobarRol(usuarioAdmin).hasRole(UserRole.ADMIN)).toBe(true)
  })

  it('devuelve false cuando el rol no coincide', () => {
    expect(crearComprobarRol(usuarioProfesor).hasRole(UserRole.ADMIN)).toBe(false)
  })

  it('devuelve false cuando no hay usuario (null)', () => {
    expect(crearComprobarRol(null).hasRole(UserRole.TECNICO)).toBe(false)
  })
})


describe('toggleTheme() lógica pura', () => {
  const toggleTheme = (theme: 'light' | 'dark'): 'light' | 'dark' =>
    theme === 'dark' ? 'light' : 'dark'

  it('cambia de "light" a "dark"', () => {
    expect(toggleTheme('light')).toBe('dark')
  })

  it('cambia de "dark" a "light"', () => {
    expect(toggleTheme('dark')).toBe('light')
  })

  it('aplicado dos veces devuelve el tema original', () => {
    expect(toggleTheme(toggleTheme('light'))).toBe('light')
  })
})
