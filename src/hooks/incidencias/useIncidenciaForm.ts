import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'

import { useIncidenciaFormState } from './useIncidenciaFormState'
import { useIncidenciaFormActions } from './useIncidenciaActions'
import { emitNotification } from '@/services/notification.service'
import { NotificationEvent } from '@/services/notification.events'

export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const { create, update } = useIncidenciaFormActions()

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
        await update(initial.id, data)

        await emitNotification({
          event: NotificationEvent.CAMBIO_ESTADO,
          incidencia: initial,
          titulo: 'Actualización',
          mensaje: 'Incidencia actualizada',
          actorId: usuario.id,
        })
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
