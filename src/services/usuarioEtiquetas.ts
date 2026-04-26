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
  // Obtener etiquetas actuales del usuario
  const actuales = await getEtiquetasPorUsuario(usuarioId)

  // Eliminar las que ya no están
  for (const id of actuales) {
    if (!etiquetaIds.includes(id)) {
      const registro = await api.get(`/usuarioEtiqueta?usuarioId=${usuarioId}&etiquetaId=${id}`)
      if (registro.data.length > 0) {
        await api.delete(`/usuarioEtiqueta/${registro.data[0].id}`)
      }
    }
  }

  // Agregar las nuevas
  for (const etiquetaId of etiquetaIds) {
    if (!actuales.includes(etiquetaId)) {
      await api.post('/usuarioEtiqueta', { usuarioId, etiquetaId })
    }
  }
}

export const deleteUsuarioEtiqueta = async (id: number) => {
  const { data } = await api.delete(`/usuarioEtiqueta/${id}`)
  return data
}
