import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteIncidencia } from '@/services/incidencias'

// borrar una incidencia
export const useDeleteIncidencia = () => {
  const [loading, setLoading] = useState(false)

  const remove = async (id: number) => {
    setLoading(true)
    try {
      await deleteIncidencia(id)
      toast.success('Incidencia borrada correctamente')
      return true
    } catch (err) {
      console.error('Error borrando incidencia:', err)
      toast.error('Error al borrar la incidencia')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading }
}
