import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'

import { useIncidenciaFormState } from './useIncidenciaFormState'
import { useIncidenciaFormActions } from './useIncidenciaActions'
import { useNotifyIncidenciaChanges } from './useNotifyIncidenciaChanges'
import { detectIncidenciaChanges } from './useIncidenciaChanges'
import { crearMensajeTracking } from '@/services/tracking'

export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const { create, update } = useIncidenciaFormActions()
  const { notifyChanges } = useNotifyIncidenciaChanges()

  const isEdit = Boolean(initial)
  const form = useIncidenciaFormState(initial)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buildPayload = () => ({
    titulo: form.titulo.trim(),
    descripcion: form.descripcion.trim(),
    categoria: form.categoria,
    ubicacion: form.ubicacion,
    urgencia: form.urgencia,
    estado: form.estado,
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario) return setError('Usuario no autenticado')

    try {
      setLoading(true)

      const data = buildPayload()

      if (isEdit && initial) {
        // Actualizar incidencia
        const updatedIncidencia = await update(initial.id, data)

        // Detectar cambios específicos
        const changes = detectIncidenciaChanges(initial, updatedIncidencia)

        // Notificar cambios y crear mensajes en chat
        if (changes.length > 0) {
          await notifyChanges(initial, updatedIncidencia, changes)
        }
      } else {
        await create({
          ...data,
          estado: IncidenciaEstado.ACTIVO,
          idUsuarioReporta: usuario.id,
        })
      }

      navigate('/panel')
    } catch (err) {
      console.error(err)
      setError('Error guardando incidencia')
    } finally {
      setLoading(false)
    }
  }

  return { ...form, loading, error, isEdit, submit }
}
