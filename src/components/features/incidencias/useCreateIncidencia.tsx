import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createIncidencia } from '@/services/incidencias'
import { useAuthStore } from '@/store/authStore'

import {
  IncidenciaEstado,
  IncidenciaUrgencia,
  type CreateIncidenciaRequest,
} from '@/types'

export const useCreateIncidencia = () => {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('Software')
  const [ubicacion, setUbicacion] = useState('Informática')
  const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>(
    IncidenciaUrgencia.MEDIA
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titulo || !descripcion) {
      setError('Rellena todos los campos')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const payload: CreateIncidenciaRequest = {
        titulo,
        descripcion,
        categoria,
        ubicacion,
        urgencia,
        idUsuarioReporta: usuario!.idUsuario,
      }

      await createIncidencia({
        ...payload,
        estado: IncidenciaEstado.ACTIVO,
        fecha: new Date().toISOString(),
        idUsuarioAsignado: null,
        fechaResolucion: null,
      })

      navigate('/panel')
    } catch {
      setError('Error al crear la incidencia')
    } finally {
      setLoading(false)
    }
  }

  return {
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
    loading,
    error,
    create,
  }
}
