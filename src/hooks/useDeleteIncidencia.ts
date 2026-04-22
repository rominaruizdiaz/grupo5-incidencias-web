import { useState } from 'react'
import { deleteIncidencia } from '@/services/incidencias'

export const useDeleteIncidencia = () => {
  const [loading, setLoading] = useState(false)

  const remove = async (id: number) => {
    setLoading(true)
    try {
      await deleteIncidencia(id)
    } finally {
      setLoading(false)
    }
  }

  return { remove, loading }
}
