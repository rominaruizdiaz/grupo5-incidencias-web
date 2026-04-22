import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'

import { useIncidenciaFormState } from './useIncidenciaFormState'
import { useIncidenciaFormActions } from './useIncidenciaActions'

export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)
  const { create, update } = useIncidenciaFormActions()

  const isEdit = !!initial

  const form = useIncidenciaFormState(initial)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario) {
      setError('Usuario no autenticado')
      return
    }

    if (!form.titulo.trim() || !form.descripcion.trim()) {
      setError('Completa los campos obligatorios')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (isEdit && initial) {
        await update(initial.id, {
          titulo: form.titulo.trim(),
          descripcion: form.descripcion.trim(),
          especialidad: form.especialidad,
          ubicacion: form.ubicacion,
          urgencia: form.urgencia,
        })
      } else {
        await create({
          titulo: form.titulo.trim(),
          descripcion: form.descripcion.trim(),
          especialidad: form.especialidad,
          ubicacion: form.ubicacion,
          urgencia: form.urgencia,
          estado: IncidenciaEstado.ACTIVO,
          idReporta: usuario.id,
        })
      }

      navigate('/panel')
    } catch {
      setError('Error al guardar la incidencia')
    } finally {
      setLoading(false)
    }
  }

  return {
    ...form,
    loading,
    error,
    isEdit,
    submit,
  }
}
