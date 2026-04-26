import api from './api'
import type { MensajeIncidencia } from '@/types'

export const getMensajes = async (): Promise<MensajeIncidencia[]> => {
  const { data } = await api.get('/mensajesIncidencia')
  return data
}

export const getMensajesPorIncidencia = async (idIncidencia: number): Promise<MensajeIncidencia[]> => {
  const { data } = await api.get(`/mensajesIncidencia?idIncidencia=${idIncidencia}`)
  return data
}

export const createMensaje = async (mensaje: MensajeIncidencia) => {
  const { data } = await api.post('/mensajesIncidencia', mensaje)
  return data
}

export const deleteMensaje = async (id: number) => {
  const { data } = await api.delete(`/mensajesIncidencia/${id}`)
  return data
}
