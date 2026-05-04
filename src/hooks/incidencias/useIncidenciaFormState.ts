import { useEffect, useState } from 'react'
import { IncidenciaUrgencia, IncidenciaEstado, type Incidencia } from '@/types'

// controla los inputs del formulario de las incidencias
export const useIncidenciaFormState = (initial?: Incidencia) => {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [categoria, setCategoria] = useState('Hardware')
  const [ubicacion, setUbicacion] = useState('Aula 01')
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
    setCategoria(initial.categoria ?? 'Hardware')
    setUbicacion(initial.ubicacion ?? 'Aula 01')
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
