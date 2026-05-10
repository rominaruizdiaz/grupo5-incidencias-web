import { useEffect, useState, useCallback } from 'react'
import type { Usuario } from '@/types'
import { getUsuarios, updateUsuario, deleteUsuario } from '@/services/personal'
import {
  getUsuarioDepartamentos,
  createUsuarioDepartamento,
  deleteUsuarioDepartamento,
} from '@/services/usuarioDepartamentos'
import { actualizarEtiquetasUsuario } from '@/services/usuarioEtiquetas'
import toast from 'react-hot-toast'

// gestion del CRUD del personal
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
    async (
      usuario: Usuario,
      departamentos: number[],
      etiquetas: number[] = []
    ) => {
      try {
        setLoading(true)
        setError(null)

        await updateUsuario(usuario.id, usuario)

        const relaciones = await getUsuarioDepartamentos()
        const actuales = relaciones.filter(r => r.usuarioId === usuario.id)

        // eliminar relaciones quitadas
        for (const rel of actuales) {
          if (!departamentos.includes(rel.departamentoId)) {
            await deleteUsuarioDepartamento(rel.id!)
          }
        }

        // crear nuevas relaciones
        for (const deptId of departamentos) {
          const existe = actuales.some(r => r.departamentoId === deptId)

          if (!existe) {
            await createUsuarioDepartamento({
              usuarioId: usuario.id,
              departamentoId: deptId,
            })
          }
        }

        // actualizar etiquetas si es técnico
        if (usuario.rol === 3) {
          await actualizarEtiquetasUsuario(usuario.id, etiquetas)
        } else {
          await actualizarEtiquetasUsuario(usuario.id, [])
        }

        await fetchUsuarios()
        toast.success('Usuario actualizado')
      } catch (err) {
        setError('Error al actualizar usuario')
        toast.error('Error al actualizar usuario')
        throw err
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

        toast.success('Usuario eliminado')
      } catch (err) {
        setError('Error al eliminar usuario')
        toast.error('Error al eliminar usuario')
        throw err
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
