import { useCallback } from 'react'
import { IncidenciaEstado, type Incidencia } from '@/types'

interface HandlersConfig {
  incidencia: Incidencia | null
  usuario: any
  modals: any
  detailData: any
  form: any
  asignarTecnico: (
    id: number,
    idTecnico: number,
    nombre: string,
    titulo: string
  ) => Promise<boolean>
  cambiarEstado: (id: number, nuevoEstado: IncidenciaEstado) => Promise<boolean>
  resolver: (id: number, descripcion?: string) => Promise<boolean>
  reabrirIncidencia: (
    id: number,
    estado?: IncidenciaEstado
  ) => Promise<boolean>
  enviarMensaje: (
    incidencia: Incidencia,
    usuarioId: number,
    mensaje: string
  ) => Promise<boolean>
  refreshMensajes: () => Promise<void>
}

interface Handlers {
  handleAbrirAsignar: () => Promise<void>
  handleAsignarTecnico: (
    idTecnico: number,
    nombreTecnico: string
  ) => Promise<void>
  handleCambiarEstado: (nuevoEstado: IncidenciaEstado) => Promise<void>
  handleResolverIncidencia: (descripcionResolucion?: string) => Promise<void>
  handleReabrirIncidencia: (nuevoEstado: IncidenciaEstado) => Promise<void>
  handleEnviarMensaje: (mensaje: string) => Promise<boolean>
  handleEstadoChange: (nuevoEstado: IncidenciaEstado) => void
}

export const useIncidenciaHandlers = ({
  incidencia,
  usuario,
  modals,
  detailData,
  form,
  asignarTecnico,
  cambiarEstado,
  resolver,
  reabrirIncidencia,
  enviarMensaje,
  refreshMensajes,
}: HandlersConfig): Handlers => {
  const handleAbrirAsignar = useCallback(async () => {
    await detailData.loadEtiquetaActual()
    modals.openAsignarModal()
  }, [detailData, modals])

  const handleAsignarTecnico = useCallback(
    async (idTecnico: number, nombreTecnico: string) => {
      if (!incidencia) return
      const exito = await asignarTecnico(
        incidencia.id,
        idTecnico,
        nombreTecnico,
        incidencia.titulo
      )
      if (exito) {
        modals.closeAsignarModal()
        setTimeout(() => window.location.reload(), 1000)
      }
    },
    [incidencia, asignarTecnico, modals]
  )

  const handleCambiarEstado = useCallback(
    async (nuevoEstado: IncidenciaEstado) => {
      if (!incidencia) return
      const exito = await cambiarEstado(incidencia.id, nuevoEstado)
      if (exito) {
        modals.closeCambiarEstadoModal()
        window.location.reload()
      }
    },
    [incidencia, cambiarEstado, modals]
  )

  const handleResolverIncidencia = useCallback(
    async (descripcionResolucion?: string) => {
      if (!incidencia) return
      const exito = await resolver(incidencia.id, descripcionResolucion)
      if (exito) {
        modals.closeResolverModal()
        setTimeout(() => window.location.reload(), 1000)
      }
    },
    [incidencia, resolver, modals]
  )

  const handleReabrirIncidencia = useCallback(
    async (nuevoEstado: IncidenciaEstado) => {
      if (!incidencia) return
      const exito = await reabrirIncidencia(
        incidencia.id,
        nuevoEstado
      )
      if (exito) {
        modals.closeReabrirModal()
        setTimeout(() => window.location.reload(), 1000)
      }
    },
    [incidencia, reabrirIncidencia, modals]
  )

  const handleEnviarMensaje = useCallback(
    async (mensaje: string): Promise<boolean> => {
      if (!usuario || !incidencia) return false

      const exito = await enviarMensaje(incidencia, usuario.id, mensaje)

      if (exito) {
        await refreshMensajes()
      }

      return exito
    },
    [usuario, incidencia, enviarMensaje, refreshMensajes]
  )

  const handleEstadoChange = useCallback(
    (nuevoEstado: IncidenciaEstado) => {
      form.setEstado(nuevoEstado)
      form.submit({
        preventDefault: () => {},
      } as React.FormEvent)
    },
    [form]
  )

  return {
    handleAbrirAsignar,
    handleAsignarTecnico,
    handleCambiarEstado,
    handleResolverIncidencia,
    handleReabrirIncidencia,
    handleEnviarMensaje,
    handleEstadoChange,
  }
}
