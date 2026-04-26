import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'
import { crearMensajeTracking, mensajesCambioEstado } from '@/services/mensajesTracking'

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
          categoria: form.categoria,
          ubicacion: form.ubicacion,
          urgencia: form.urgencia,
          estado: form.estado,
        })

        // Si el estado cambió, crear mensaje automático de tracking
        if (initial.estado !== form.estado) {
          let mensajeTracking = ''
          if (form.estado === IncidenciaEstado.ACTIVO) {
            mensajeTracking = mensajesCambioEstado.aActivo(usuario.nombre)
          } else if (form.estado === IncidenciaEstado.EN_CURSO) {
            mensajeTracking = mensajesCambioEstado.aEnCurso(usuario.nombre)
          } else if (form.estado === IncidenciaEstado.RESUELTO) {
            mensajeTracking = mensajesCambioEstado.aResuelto(usuario.nombre)
          }

          if (mensajeTracking) {
            await crearMensajeTracking(initial.id, usuario, mensajeTracking)
          }
        }
      } else {
        await create({
          titulo: form.titulo.trim(),
          descripcion: form.descripcion.trim(),
          categoria: form.categoria,
          ubicacion: form.ubicacion,
          urgencia: form.urgencia,
          estado: IncidenciaEstado.ACTIVO,
          idUsuarioReporta: usuario.id,
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
