import { useCallback, useEffect, useState } from 'react'
import {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '@/services/departamentos'
import type { Departamento } from '@/types'

export const useAdminDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDepartamentos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await getDepartamentos()
      setDepartamentos(data)
    } catch (err) {
      setError('Error cargando departamentos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDepartamentos()
  }, [fetchDepartamentos])

  const crear = async (nombre: string) => {
    if (!nombre.trim()) return

    try {
      await createDepartamento({ nombre })
      await fetchDepartamentos()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al crear departamento'
      setError(message)
      throw err
    }
  }

  const actualizar = async (id: number, nombre: string) => {
    if (!nombre.trim()) return

    try {
      await updateDepartamento(id, { nombre })
      await fetchDepartamentos()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al actualizar departamento'
      setError(message)
      throw err
    }
  }

  const eliminar = async (id: number) => {
    try {
      await deleteDepartamento(id)
      await fetchDepartamentos()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Error al eliminar departamento'
      setError(message)
      throw err
    }
  }

  return {
    departamentos,
    loading,
    error,
    crear,
    actualizar,
    eliminar,
    refetch: fetchDepartamentos,
  }
}
