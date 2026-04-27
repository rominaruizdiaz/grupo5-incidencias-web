import api from './api'
import type { Notificacion } from '@/types'

export const getNotificaciones = async (): Promise<Notificacion[]> => {
  const { data } = await api.get('/notificaciones')
  return data
}

export const getNotificacionesPorUsuario = async (usuarioId: number): Promise<Notificacion[]> => {
  const { data } = await api.get(`/notificaciones?idUsuarioDestino=${usuarioId}`)
  return data
}

export const createNotificacion = async (notificacion: Notificacion) => {
  const { data } = await api.post('/notificaciones', notificacion)
  return data
}

export const marcarComoLeida = async (id: number) => {
  const { data } = await api.patch(`/notificaciones/${id}`, { leida: true })
  return data
}

export const marcarTodasComoLeidas = async (usuarioId: number) => {
  const notificaciones = await getNotificacionesPorUsuario(usuarioId)
  return Promise.all(
    notificaciones.map(n => marcarComoLeida(n.id!))
  )
}

export const deleteNotificacion = async (id: number) => {
  const { data } = await api.delete(`/notificaciones/${id}`)
  return data
}
