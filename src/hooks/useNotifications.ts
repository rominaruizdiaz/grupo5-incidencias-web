import { useCallback } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { createNotificacion } from '@/services/notificaciones'
import type { Incidencia, Usuario } from '@/types'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { getUsuarios } from '@/services/personal'

type AccionNotificacion = string

const buildInvolucrados = (
  incidencia: Incidencia,
  usuarioActualId: number,
  usuarios: Usuario[],
  relaciones: { usuarioId: number }[]
) => {
  const involucrados = new Set<number>()

  // Reportador
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

    const esValido = u.rol === 1 || u.rol === 3
    const noSoyYo = u.id !== usuarioActualId

    if (esValido && noSoyYo) {
      involucrados.add(u.id)
    }
  })

  return Array.from(involucrados)
}

export const useNotifications = () => {
  const usuario = useAuthStore(state => state.usuario)

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

        const now = new Date().toISOString()

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
