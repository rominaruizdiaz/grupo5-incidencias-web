import { useEffect, useState } from 'react'
import { IncidenciaUrgencia, type Incidencia } from '@/types'

export const useIncidenciaFormState = (initial?: Incidencia) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('Software')
  const [ubicacion, setUbicacion] = useState('Informática')
  const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>(
    IncidenciaUrgencia.MEDIA
  )

  useEffect(() => {
    if (!initial) return

    setTitulo(initial.titulo ?? '')
    setDescripcion(initial.descripcion ?? '')
    setCategoria(initial.categoria ?? 'Software')
    setUbicacion(initial.ubicacion ?? 'Informática')
    setUrgencia(initial.urgencia ?? IncidenciaUrgencia.MEDIA)
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
  }
}
