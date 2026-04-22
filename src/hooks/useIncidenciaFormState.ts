import { useEffect, useState } from 'react'
import { IncidenciaUrgencia, IncidenciaEstado, type Incidencia } from '@/types'

export const useIncidenciaFormState = (initial?: Incidencia) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [especialidad, setEspecialidad] = useState('Software')
  const [ubicacion, setUbicacion] = useState('Informática')
  const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>(
    IncidenciaUrgencia.MEDIA
  )

  const [estado, setEstado] = useState<IncidenciaEstado>(
    initial?.estado ?? IncidenciaEstado.ACTIVO
  )

  useEffect(() => {
    if (!initial) return

    setTitulo(initial.titulo ?? '')
    setDescripcion(initial.descripcion ?? '')
    setEspecialidad(initial.especialidad ?? 'Software')
    setUbicacion(initial.ubicacion ?? 'Informática')
    setUrgencia(initial.urgencia ?? IncidenciaUrgencia.MEDIA)
    setEstado(initial.estado ?? IncidenciaEstado.ACTIVO)
  }, [initial])

  return {
    titulo,
    setTitulo,
    descripcion,
    setDescripcion,
    especialidad,
    setEspecialidad,
    ubicacion,
    setUbicacion,
    urgencia,
    setUrgencia,
    estado,
    setEstado,
  }
}
