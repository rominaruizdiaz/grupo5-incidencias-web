import { useCallback } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { createNotificacion } from '@/services/notificaciones'
import type { Incidencia, Usuario } from '@/types'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { getUsuarios } from '@/services/personal'

type AccionNotificacion = string

// lista de usuarios a los que notificar basandose en la relacion de incidencia-departamentos
const buildInvolucrados = (
  incidencia: Incidencia,
  usuarioActualId: number,
  usuarios: Usuario[],
  relaciones: { usuarioId: number }[]
) => {
  const involucrados = new Set<number>()

  if (
    incidencia.idUsuarioReporta &&
    incidencia.idUsuarioReporta !== usuarioActualId
  ) {
    involucrados.add(incidencia.idUsuarioReporta)
  }

  const usuariosMap = new Map(usuarios.map(u => [u.id, u]))

  relaciones.forEach(r => {
    const u = usuariosMap.get(r.usuarioId)
    if (!u) return

    // solo notificamos a admin/tecnicos implicados
    const esValido = u.rol === 1 || u.rol === 3

    // no notificamos al que reporta
    const noSoyYo = u.id !== usuarioActualId

    if (esValido && noSoyYo) {
      involucrados.add(u.id)
    }
  })

  // devolvemos lista final sin duplicados
  return Array.from(involucrados)
}

// se encarga de notificar automaticamente a un usuario cuando ocurre un cambio
export const useNotifications = () => {
  const usuario = useAuthStore(state => state.usuario)

  // notificaciones de cambio
  const notificarCambio = useCallback(
    async (incidencia: Incidencia, accion: AccionNotificacion) => {
      if (!usuario) return

      try {
        const [relaciones, usuarios] = await Promise.all([
          getUsuarioDepartamentos(),
          getUsuarios(),
        ])

        const involucrados = buildInvolucrados(
          incidencia,
          usuario.id,
          usuarios,
          relaciones
        )

        // timestamp único para todas las notificaciones
        const now = new Date().toISOString()

        // creación con promesa
        await Promise.all(
          involucrados.map(idUsuarioDestino =>
            createNotificacion({
              idUsuarioDestino,
              titulo: accion,
              mensaje: `${accion} en "${incidencia.titulo}"`,
              leida: false,
              fechaCreacion: now,
              idIncidenciaVinculada: incidencia.id,
            })
          )
        )
      } catch (err) {
        console.error('Error en notificaciones:', err)
      }
    },
    [usuario]
  )

  return { notificarCambio }
}
