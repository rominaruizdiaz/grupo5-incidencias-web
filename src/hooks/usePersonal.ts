import { useEffect, useState, useCallback } from 'react'
import type { Usuario } from '@/types'
import { getUsuarios, updateUsuario, deleteUsuario } from '@/services/personal'
import { updateUsuarioDepartamentos } from '@/services/usuarioDepartamento'

export const usePersonal = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getUsuarios()
      setUsuarios(data)
    } catch {
      setError('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }, [])

  const editarUsuario = useCallback(
    async (usuario: Usuario, departamentos: number[]) => {
      try {
        setLoading(true)
        setError(null)

        await updateUsuario(usuario.id, usuario)
        await updateUsuarioDepartamentos(usuario.id, departamentos)

        await fetchUsuarios()
      } catch {
        setError('Error al actualizar usuario')
        throw new Error()
      } finally {
        setLoading(false)
      }
    },
    [fetchUsuarios]
  )

  const eliminarUsuario = useCallback(
    async (id: number) => {
      try {
        setLoading(true)

        await deleteUsuario(id)
        await fetchUsuarios()
      } catch {
        setError('Error al eliminar usuario')
        throw new Error()
      } finally {
        setLoading(false)
      }
    },
    [fetchUsuarios]
  )

  useEffect(() => {
    fetchUsuarios()
  }, [fetchUsuarios])

  return {
    usuarios,
    loading,
    error,
    editarUsuario,
    eliminarUsuario,
    refresh: fetchUsuarios,
  }
}
