import { useState } from 'react'
import { IncidenciaUrgencia, type Incidencia } from '@/types'

export const useIncidenciaFormState = (initial?: Incidencia) => {
  const [titulo, setTitulo] = useState(initial?.titulo ?? '')
  const [descripcion, setDescripcion] = useState(initial?.descripcion ?? '')
  const [categoria, setCategoria] = useState(initial?.categoria ?? 'Software')
  const [ubicacion, setUbicacion] = useState(
    initial?.ubicacion ?? 'Informática'
  )
  const [urgencia, setUrgencia] = useState<IncidenciaUrgencia>(
    initial?.urgencia ?? IncidenciaUrgencia.MEDIA
  )

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
