import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createIncidencia, updateIncidencia } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'

import {
  IncidenciaEstado,
  IncidenciaUrgencia,
  type Incidencia,
  type CreateIncidenciaRequest,
} from '@/types'

export const useIncidenciaForm = (initial?: Incidencia) => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const isEdit = !!initial

  // state del formulario
  const [titulo, setTitulo] = useState(initial?.titulo ?? '')
  const [descripcion, setDescripcion] = useState(initial?.descripcion ?? '')
  const [categoria, setCategoria] = useState(initial?.categoria ?? 'Software')
  const [ubicacion, setUbicacion] = useState(
    initial?.ubicacion ?? 'Informática'
  )
  const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>(
    initial?.urgencia ?? IncidenciaUrgencia.MEDIA
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // si cambia la incidencia
  useEffect(() => {
    if (!initial) return

    setTitulo(initial.titulo)
    setDescripcion(initial.descripcion)
    setCategoria(initial.categoria)
    setUbicacion(initial.ubicacion)
    setUrgencia(initial.urgencia)
  }, [initial])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!usuario) {
      setError('Usuario no autenticado')
      return
    }

    if (!titulo || !descripcion) {
      setError('Completa los campos obligatorios')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (isEdit && initial) {
        await updateIncidencia(initial.id, {
          titulo,
          descripcion,
          categoria,
          ubicacion,
          urgencia,
        })
      } else {
        const payload: CreateIncidenciaRequest = {
          titulo,
          descripcion,
          categoria,
          ubicacion,
          urgencia,
          estado: IncidenciaEstado.ACTIVO,
          idUsuarioReporta: usuario.idUsuario,
        }

        await createIncidencia(payload)
      }

      navigate('/panel')
    } catch {
      setError('Error al guardar la incidencia')
    } finally {
      setLoading(false)
    }
  }

  return {
    // state
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    categoria,
    setCategoria,
    ubicacion,
    setUbicacion,
    urgencia,
    setUrgencia,

    // ui state
    loading,
    error,
    isEdit,

    // actions
    submit,
  }
}
