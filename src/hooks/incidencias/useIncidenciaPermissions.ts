import type { Incidencia } from '@/types'
import { useMemo } from 'react'

interface PermissionsState {
  esCreador: boolean
  esAdmin: boolean
  esTecnico: boolean
  esAsignado: boolean
  tieneespecializacion: boolean
  puedeEditarTextos: boolean
  puedeCambiarEstado: boolean
  puedeAsignar: boolean
  puedeSelfAsignar: boolean
  puedeResolver: boolean
  puedeEliminar: boolean
  tieneAccesoAlChat: boolean
}

export const useIncidenciaPermissions = (
  incidencia: Incidencia | null,
  usuarioId: number | undefined,
  usuarioRol: number | undefined,
  etiquetasUsuario: number[],
  etiquetas: any[]
): PermissionsState => {
  return useMemo(() => {
    if (!incidencia || !usuarioId || !usuarioRol) {
      return {
        esCreador: false,
        esAdmin: false,
        esTecnico: false,
        esAsignado: false,
        tieneespecializacion: false,
        puedeEditarTextos: false,
        puedeCambiarEstado: false,
        puedeAsignar: false,
        puedeSelfAsignar: false,
        puedeResolver: false,
        puedeEliminar: false,
        tieneAccesoAlChat: false,
      }
    }

    const esCreador = usuarioId === incidencia.idUsuarioReporta
    const esAdmin = usuarioRol === 1
    const esTecnico = usuarioRol === 3
    const esAsignado = usuarioId === incidencia.idUsuarioAsignado

    const tieneespecializacion = (() => {
      if (!esTecnico || !incidencia.categoria) return false
      const etiquetaCategoria = etiquetas.find(
        e => e.nombre === incidencia.categoria
      )
      return etiquetaCategoria
        ? etiquetasUsuario.includes(etiquetaCategoria.id)
        : false
    })()

    const puedeEditarTextos =
      (esCreador || esAdmin) && incidencia.estado !== 'Resuelto'

    const puedeCambiarEstado =
      (esAdmin || (esTecnico && esAsignado)) && incidencia.estado !== 'Resuelto'

    const puedeAsignar = esAdmin

    const puedeSelfAsignar =
      esTecnico &&
      !esAsignado &&
      !incidencia.idUsuarioAsignado &&
      tieneespecializacion &&
      incidencia.estado !== 'Resuelto'

    const puedeResolver =
      incidencia.estado !== 'Resuelto' &&
      (esAdmin ||
        (esTecnico &&
          (esAsignado ||
            (!incidencia.idUsuarioAsignado && tieneespecializacion))))

    const puedeEliminar =
      (esCreador && incidencia.estado !== 'Resuelto') || esAdmin

    const tieneAccesoAlChat =
      puedeEditarTextos || puedeCambiarEstado || puedeAsignar

    return {
      esCreador,
      esAdmin,
      esTecnico,
      esAsignado,
      tieneespecializacion,
      puedeEditarTextos,
      puedeCambiarEstado,
      puedeAsignar,
      puedeSelfAsignar,
      puedeResolver,
      puedeEliminar,
      tieneAccesoAlChat,
    }
  }, [incidencia, usuarioId, usuarioRol, etiquetasUsuario, etiquetas])
}
