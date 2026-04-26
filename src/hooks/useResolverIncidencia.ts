import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { createNotificacion } from '@/services/notificaciones'
import toast from 'react-hot-toast'

export const useResolverIncidencia = () => {
  const [loading, setLoading] = useState(false)

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
          estado: 'Resuelto',
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
    []
  )

  return { resolverIncidencia, loading }
}
