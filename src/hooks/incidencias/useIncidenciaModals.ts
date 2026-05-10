import { useState } from 'react'

interface ModalsState {
  isModalAsignarOpen: boolean
  isModalCambiarEstadoOpen: boolean
  isModalResolverOpen: boolean
  isModalReabrirOpen: boolean
  openAsignarModal: () => void
  closeAsignarModal: () => void
  openCambiarEstadoModal: () => void
  closeCambiarEstadoModal: () => void
  openResolverModal: () => void
  closeResolverModal: () => void
  openReabrirModal: () => void
  closeReabrirModal: () => void
}

export const useIncidenciaModals = (): ModalsState => {
  const [isModalAsignarOpen, setIsModalAsignarOpen] = useState(false)
  const [isModalCambiarEstadoOpen, setIsModalCambiarEstadoOpen] = useState(false)
  const [isModalResolverOpen, setIsModalResolverOpen] = useState(false)
  const [isModalReabrirOpen, setIsModalReabrirOpen] = useState(false)

  return {
    isModalAsignarOpen,
    isModalCambiarEstadoOpen,
    isModalResolverOpen,
    isModalReabrirOpen,
    openAsignarModal: () => setIsModalAsignarOpen(true),
    closeAsignarModal: () => setIsModalAsignarOpen(false),
    openCambiarEstadoModal: () => setIsModalCambiarEstadoOpen(true),
    closeCambiarEstadoModal: () => setIsModalCambiarEstadoOpen(false),
    openResolverModal: () => setIsModalResolverOpen(true),
    closeResolverModal: () => setIsModalResolverOpen(false),
    openReabrirModal: () => setIsModalReabrirOpen(true),
    closeReabrirModal: () => setIsModalReabrirOpen(false),
  }
}
