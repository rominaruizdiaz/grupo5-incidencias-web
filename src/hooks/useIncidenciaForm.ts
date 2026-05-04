import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaEstado, type Incidencia } from '@/types'
import { crearMensajeTracking, mensajesCambioEstado } from '@/services/tracking'

import { useIncidenciaFormState } from './useIncidenciaFormState'
import { useIncidenciaFormActions } from './useIncidenciaActions'
import { useNotifications } from './useNotifications'

export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const { create, update } = useIncidenciaFormActions()
  const { notificarCambio } = useNotifications()

  const isEdit = Boolean(initial)
  const form = useIncidenciaFormState(initial)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCambioEstado = (estado: IncidenciaEstado, nombre: string) => {
    switch (estado) {
      case IncidenciaEstado.ACTIVO:
        return {
          mensaje: mensajesCambioEstado.aActivo(nombre),
          accion: 'Cambio de estado a Activo',
        }

      case IncidenciaEstado.EN_CURSO:
        return {
          mensaje: mensajesCambioEstado.aEnCurso(nombre),
          accion: 'Cambio de estado a En Curso',
        }

      case IncidenciaEstado.RESUELTO:
        return {
          mensaje: mensajesCambioEstado.aResuelto(nombre),
          accion: 'Cambio de estado a Resuelto',
        }

      default:
        return null
    }
  }

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

      const data = {
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        categoria: form.categoria,
        ubicacion: form.ubicacion,
        urgencia: form.urgencia,
        estado: form.estado,
      }

      // EDITAR
      if (isEdit && initial) {
        await update(initial.id, data)

        if (initial.estado !== form.estado) {
          const cambio = getCambioEstado(form.estado, usuario.nombre)

          if (cambio) {
            await crearMensajeTracking(initial.id, usuario, cambio.mensaje)

            await notificarCambio(initial, cambio.accion)
          }
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
