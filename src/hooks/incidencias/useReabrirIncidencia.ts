import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import { crearMensajeTracking, mensajesResolucion } from '@/services/tracking'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

// logica para reabrir una incidencia
export const useReabrirIncidencia = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const reabrirIncidencia = useCallback(
    async (
      idIncidencia: number,
      idUsuarioAsignado: number | undefined,
      tituloIncidencia: string,
      nuevoEstado: IncidenciaEstado = IncidenciaEstado.ACTIVO
    ) => {
      try {
        setLoading(true)

        const ahora = new Date().toISOString()

        // actualizar incidencia
        await updateIncidencia(idIncidencia, {
          estado: nuevoEstado,
          fechaResolucion: null,
        })

        // notificar al técnico asignado si existe
        if (idUsuarioAsignado) {
          await createNotificacion({
            idUsuarioDestino: idUsuarioAsignado,
            titulo: 'Incidencia Reabierta',
            mensaje: `La incidencia "${tituloIncidencia}" ha sido reabierta. Estado: ${nuevoEstado}`,
            leida: false,
            fechaCreacion: ahora,
            idIncidenciaVinculada: idIncidencia,
          })
        }

        // crear mensaje de tracking
        if (usuario) {
          const mensajeTracking = mensajesResolucion.reabierto(
            usuario.nombre,
            nuevoEstado
          )
          await crearMensajeTracking(idIncidencia, usuario, mensajeTracking)
        }

        toast.success(`Incidencia reabierta como ${nuevoEstado}`)
        return true
      } catch (err) {
        console.error('Error reabriendo incidencia:', err)
        toast.error('Error al reabrir incidencia')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { reabrirIncidencia, loading }
}
