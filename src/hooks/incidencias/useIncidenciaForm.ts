import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'

import { crearMensajeTracking } from '@/services/tracking'
import { useIncidenciaFormState } from './useIncidenciaFormState'
import { useIncidenciaFormActions } from './useIncidenciaActions'
import { useNotifications } from '../notificaciones/useNotifications'
import { ESTADO_TRACKING_MAP } from '@/config/estadoTrackingMap'

// centralización de la lógica del formulario para crear, editar incidencia
export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const { create, update } = useIncidenciaFormActions()
  const { notificarCambio } = useNotifications()

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

      const data = buildPayload()

      // EDITAR
      if (isEdit && initial) {
        await update(initial.id, data)

        const estadoCambiado = initial.estado !== form.estado

        if (estadoCambiado) {
          const config = ESTADO_TRACKING_MAP[form.estado]

          const mensaje = config.mensaje(usuario.nombre)

          await crearMensajeTracking(initial.id, usuario, mensaje)

          await notificarCambio(initial, config.accion)
        }
      }

      // CREAR
      else {
        await create({
          ...data,
          estado: IncidenciaEstado.ACTIVO,
          idUsuarioReporta: usuario.id,
        })
      }

      navigate('/panel')
    } catch (err) {
      console.error(err)
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
