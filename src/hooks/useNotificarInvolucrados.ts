import { useCallback } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { createNotificacion } from '@/services/notificaciones'
import { getUsuarioDepartamentos, getUsuarios } from '@/services'
import type { Incidencia, Usuario } from '@/types'

export const useNotificarInvolucrados = () => {
  const usuario = useAuthStore(state => state.usuario)

  const notificarCambio = useCallback(
    async (incidencia: Incidencia, accion: string) => {
      if (!usuario) return

      try {
        const [uds, usuarios] = await Promise.all([
          getUsuarioDepartamentos(),
          getUsuarios(),
        ])

        // Obtener el nombre del departamento de la incidencia
        const nombreDepto = incidencia.ubicacion

        // Obtener todos los usuarios del departamento
        const usuariosDelDepto = uds
          .filter(ud => {
            const depto = usuarios.find(u => u.id === ud.usuarioId)
            return depto ? true : false
          })
          .map(ud => ud.usuarioId)

        // Filtrar técnicos (rol 3) y admins (rol 1) del departamento
        const involucrados = new Set<number>()

        // Agregar el reportador
        if (incidencia.idUsuarioReporta && incidencia.idUsuarioReporta !== usuario.id) {
          involucrados.add(incidencia.idUsuarioReporta)
        }

        // Agregar técnicos y admins del departamento (excepto el usuario actual)
        usuariosDelDepto.forEach(uid => {
          const user = usuarios.find(u => u.id === uid)
          if (user && (user.rol === 1 || user.rol === 3) && user.id !== usuario.id) {
            involucrados.add(user.id)
          }
        })

        // Crear notificación para cada involucrado
        const ahora = new Date().toISOString()

        for (const idUsuarioDestino of involucrados) {
          try {
            await createNotificacion({
              idUsuarioDestino,
              titulo: `${accion}`,
              mensaje: `${accion} en "${incidencia.titulo}"`,
              leida: false,
              fechaCreacion: ahora,
              idIncidenciaVinculada: incidencia.id,
            })
          } catch (err) {
            console.error(`Error notificando a usuario ${idUsuarioDestino}:`, err)
          }
        }
      } catch (err) {
        console.error('Error obteniendo involucrados:', err)
      }
    },
    [usuario]
  )

  return { notificarCambio }
}
