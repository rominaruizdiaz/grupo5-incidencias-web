import { useCallback, useState } from 'react'
import { updateIncidencia } from '@/services/incidencias'
import { IncidenciaEstado } from '@/types'
import toast from 'react-hot-toast'

// cambiar el estado de una incidencia (activo, en curso, resuelto)
export const useCambiarEstado = () => {
  const [loading, setLoading] = useState(false)

  const cambiarEstado = useCallback(
    async (idIncidencia: number, nuevoEstado: IncidenciaEstado) => {
      try {
        setLoading(true)

        // si se marca como "resuelto, se guarda la fecha, pero si uuelve a otro estado, se borra
        const updates: Record<string, any> = { estado: nuevoEstado }
        if (nuevoEstado === IncidenciaEstado.RESUELTO) {
          updates.fechaResolucion = new Date().toISOString()
        } else {
          updates.fechaResolucion = null
        }

        await updateIncidencia(idIncidencia, updates)
        toast.success(`Estado cambiado a ${nuevoEstado}`)
        return true
      } catch (err) {
        console.error('Error cambiando estado:', err)
        toast.error('Error al cambiar estado')
        return false
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { cambiarEstado, loading }
}
