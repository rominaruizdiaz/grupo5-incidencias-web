import api from './api'

export interface UsuarioEtiqueta {
  id?: number
  usuarioId: number
  etiquetaId: number
}

export const getUsuarioEtiquetas = async (): Promise<UsuarioEtiqueta[]> => {
  const { data } = await api.get('/usuarioEtiqueta')
  return data
}

export const getEtiquetasPorUsuario = async (usuarioId: number): Promise<number[]> => {
  const { data } = await api.get(`/usuarioEtiqueta?usuarioId=${usuarioId}`)
  return data.map((ue: UsuarioEtiqueta) => ue.etiquetaId)
}

export const actualizarEtiquetasUsuario = async (
  usuarioId: number,
  etiquetaIds: number[]
) => {
  // Obtener todos los registros de usuarioEtiqueta del usuario
  const { data: registros } = await api.get(`/usuarioEtiqueta?usuarioId=${usuarioId}`)

  // Eliminar las que ya no están
  for (const registro of registros) {
    if (!etiquetaIds.includes(registro.etiquetaId)) {
      await api.delete(`/usuarioEtiqueta/${registro.id}`)
    }
  }

  // Agregar las nuevas
  const actualesIds = registros.map((r: UsuarioEtiqueta) => r.etiquetaId)
  for (const etiquetaId of etiquetaIds) {
    if (!actualesIds.includes(etiquetaId)) {
      await api.post('/usuarioEtiqueta', { usuarioId, etiquetaId })
    }
  }
}

export const deleteUsuarioEtiqueta = async (id: number) => {
  const { data } = await api.delete(`/usuarioEtiqueta/${id}`)
  return data
}
