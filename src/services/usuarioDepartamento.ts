import api from './api'
import type { UsuarioDepartamento } from '@/types'

export const getUsuarioDepartamentos = async (): Promise<
  UsuarioDepartamento[]
> => {
  const { data } = await api.get('/usuarioDepartamento')
  return data
}

// conseguir los departamentos del usuario
export const getDepartamentosDeUsuario = async (
  usuarioId: number
): Promise<number[]> => {
  const asignaciones = await getUsuarioDepartamentos()
  return asignaciones
    .filter(ud => ud.usuarioId === usuarioId)
    .map(ud => ud.idDepartamento)
}

// conseguir los usuarios de departamento
export const getUsuariosDeDepartamento = async (
  idDepartamento: number
): Promise<number[]> => {
  const asignaciones = await getUsuarioDepartamentos()
  return asignaciones
    .filter(ud => ud.idDepartamento === idDepartamento)
    .map(ud => ud.usuarioId)
}

// ADD
export const addUsuarioDepartamento = async (
  usuarioId: number,
  idDepartamento: number
): Promise<UsuarioDepartamento> => {
  const { data } = await api.post('/usuarioDepartamento', {
    usuarioId,
    idDepartamento,
  })
  return data
}

// DELETE
export const removeUsuarioDepartamento = async (
  usuarioId: number,
  idDepartamento: number
): Promise<void> => {
  const asignaciones = await getUsuarioDepartamentos()

  const asignacion = asignaciones.find(
    ud => ud.usuarioId === usuarioId && ud.idDepartamento === idDepartamento
  )

  if (asignacion) {
    await api.delete(`/usuarioDepartamento/${asignacion.id}`)
  }
}

// UPDATE
export const updateUsuarioDepartamentos = async (
  usuarioId: number,
  nuevos: number[]
): Promise<void> => {
  const asignaciones = await getUsuarioDepartamentos()
  const actuales = asignaciones.filter(ud => ud.usuarioId === usuarioId)

  // eliminar los que sobran
  for (const a of actuales) {
    if (!nuevos.includes(a.idDepartamento)) {
      await api.delete(`/usuarioDepartamento/${a.id}`)
    }
  }

  // añadir nuevos
  for (const depId of nuevos) {
    if (!actuales.find(a => a.idDepartamento === depId)) {
      await addUsuarioDepartamento(usuarioId, depId)
    }
  }
}
