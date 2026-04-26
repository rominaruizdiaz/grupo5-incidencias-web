import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

export const useReabrirIncidencia = () => {
  const [loading, setLoading] = useState(false)

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

        // Actualizar incidencia
        await updateIncidencia(idIncidencia, {
          estado: nuevoEstado,
          fechaResolucion: null,
        })

        // Notificar al técnico asignado si existe
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
    []
  )

  return { reabrirIncidencia, loading }
}
