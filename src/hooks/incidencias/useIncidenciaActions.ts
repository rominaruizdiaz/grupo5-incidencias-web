import {
  createIncidencia,
  updateIncidencia,
  deleteIncidencia,
} from '@/services/incidencias'
import type { CreateIncidenciaRequest, Incidencia } from '@/types'

// elección de las operaciones CRUD de incidencias para despues llamar a sus correspondientes servicios
export const useIncidenciaFormActions = () => {
  const create = async (data: CreateIncidenciaRequest) => {
    return createIncidencia(data)
  }

  const update = async (id: number, data: Partial<Incidencia>) => {
    return updateIncidencia(id, data)
  }

  const remove = async (id: number) => {
    return deleteIncidencia(id)
  }

  return { create, update, remove }
}
