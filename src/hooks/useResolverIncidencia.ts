import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import { crearMensajeTracking, mensajesResolucion } from '@/services/mensajesTracking'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

export const useResolverIncidencia = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const resolverIncidencia = useCallback(
    async (
      idIncidencia: number,
      idUsuarioReporta: number,
      tituloIncidencia: string,
      descripcionResolucion?: string
    ) => {
      try {
        setLoading(true)

        const ahora = new Date().toISOString()

        // 1. Actualizar incidencia como resuelta
        await updateIncidencia(idIncidencia, {
          estado: IncidenciaEstado.RESUELTO,
          fechaResolucion: ahora,
        })

        // 2. Generar notificación al creador
        await createNotificacion({
          idUsuarioDestino: idUsuarioReporta,
          titulo: 'Incidencia Resuelta',
          mensaje: `Tu incidencia "${tituloIncidencia}" ha sido resuelta${descripcionResolucion ? ': ' + descripcionResolucion : ''}`,
          leida: false,
          fechaCreacion: ahora,
          idIncidenciaVinculada: idIncidencia,
        })

        // 3. Crear mensaje de tracking
        if (usuario) {
          const mensajeTracking = mensajesResolucion.resuelto(usuario.nombre, descripcionResolucion)
          await crearMensajeTracking(idIncidencia, usuario, mensajeTracking)
        }

        toast.success('Incidencia marcada como resuelta')
        return true
      } catch (err) {
        console.error('Error resolviendo incidencia:', err)
        toast.error('Error al resolver incidencia')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { resolverIncidencia, loading }
}
