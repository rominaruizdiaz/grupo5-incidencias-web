import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import { crearMensajeTracking, mensajesAsignacion } from '@/services/mensajesTracking'
import { useAuthStore } from '@/store/auth.store'
import toast from 'react-hot-toast'

export const useAsignarTecnico = () => {
  const [loading, setLoading] = useState(false)
  const usuario = useAuthStore(state => state.usuario)

  const asignarTecnico = useCallback(
    async (
      idIncidencia: number,
      idUsuarioAsignado: number,
      nombreTecnico: string,
      tituloIncidencia: string
    ) => {
      try {
        setLoading(true)

        // 1. Actualizar incidencia con técnico asignado
        await updateIncidencia(idIncidencia, {
          idUsuarioAsignado,
        })

        // 2. Generar notificación al técnico
        const ahora = new Date().toISOString()
        await createNotificacion({
          idUsuarioDestino: idUsuarioAsignado,
          titulo: 'Incidencia Asignada',
          mensaje: `Se te ha asignado: ${tituloIncidencia}`,
          leida: false,
          fechaCreacion: ahora,
          idIncidenciaVinculada: idIncidencia,
        })

        // 3. Crear mensaje de tracking
        if (usuario) {
          const mensajeTracking = mensajesAsignacion.asignado(usuario.nombre, nombreTecnico)
          await crearMensajeTracking(idIncidencia, usuario, mensajeTracking)
        }

        toast.success(`Incidencia asignada a ${nombreTecnico}`)
        return true
      } catch (err) {
        console.error('Error asignando técnico:', err)
        toast.error('Error al asignar incidencia')
        return false
      } finally {
        setLoading(false)
      }
    },
    [usuario]
  )

  return { asignarTecnico, loading }
}
