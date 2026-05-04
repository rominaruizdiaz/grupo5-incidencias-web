import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import { crearMensajeTracking, mensajesAsignacion } from '@/services/tracking'
import { useAuthStore } from '@/store/auth.store'
import toast from 'react-hot-toast'

// asignar una incidencia a un técnico
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

        // actualiza la incidencia con el nuevo tecnico asignado
        await updateIncidencia(idIncidencia, {
          idUsuarioAsignado,
        })

        // genera notificacion al tecnico
        const ahora = new Date().toISOString()
        await createNotificacion({
          idUsuarioDestino: idUsuarioAsignado,
          titulo: 'Incidencia Asignada',
          mensaje: `Se te ha asignado: ${tituloIncidencia}`,
          leida: false,
          fechaCreacion: ahora,
          idIncidenciaVinculada: idIncidencia,
        })

        // crea mensaje para trackear
        if (usuario) {
          const mensajeTracking = mensajesAsignacion.asignado(
            usuario.nombre,
            nombreTecnico
          )
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
