import { Incidencia } from '@/types'

export interface IncidenciaChange {
  field: 'titulo' | 'descripcion' | 'categoria' | 'ubicacion' | 'urgencia' | 'estado'
  oldValue: string
  newValue: string
  label: string
}

export const detectIncidenciaChanges = (
  original: Incidencia | null,
  updated: Incidencia
): IncidenciaChange[] => {
  if (!original) return []

  const changes: IncidenciaChange[] = []

  if (original.titulo !== updated.titulo) {
    changes.push({
      field: 'titulo',
      oldValue: original.titulo,
      newValue: updated.titulo,
      label: 'Título',
    })
  }

  if (original.descripcion !== updated.descripcion) {
    changes.push({
      field: 'descripcion',
      oldValue: original.descripcion,
      newValue: updated.descripcion,
      label: 'Descripción',
    })
  }

  if (original.categoria !== updated.categoria) {
    changes.push({
      field: 'categoria',
      oldValue: original.categoria,
      newValue: updated.categoria,
      label: 'Categoría/Área',
    })
  }

  if (original.ubicacion !== updated.ubicacion) {
    changes.push({
      field: 'ubicacion',
      oldValue: original.ubicacion,
      newValue: updated.ubicacion,
      label: 'Ubicación',
    })
  }

  if (original.urgencia !== updated.urgencia) {
    changes.push({
      field: 'urgencia',
      oldValue: original.urgencia,
      newValue: updated.urgencia,
      label: 'Urgencia',
    })
  }

  if (original.estado !== updated.estado) {
    changes.push({
      field: 'estado',
      oldValue: original.estado,
      newValue: updated.estado,
      label: 'Estado',
    })
  }

  return changes
}

export const formatChangeMessage = (
  change: IncidenciaChange,
  userName: string
): string => {
  return `${userName} cambió ${change.label.toLowerCase()} de "${change.oldValue}" a "${change.newValue}"`
}
