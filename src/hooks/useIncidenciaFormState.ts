import { useEffect, useState } from 'react'
import { IncidenciaUrgencia, IncidenciaEstado, type Incidencia } from '@/types'

export const useIncidenciaFormState = (initial?: Incidencia) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('Software')
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
    setCategoria(initial.categoria ?? 'Software')
    setUbicacion(initial.ubicacion ?? 'Informática')
    setUrgencia(initial.urgencia ?? IncidenciaUrgencia.MEDIA)
    setEstado(initial.estado ?? IncidenciaEstado.ACTIVO)
  }, [initial])

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
    estado,
    setEstado,
  }
}
