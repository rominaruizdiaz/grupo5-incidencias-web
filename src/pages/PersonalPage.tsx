import { useState, useEffect } from 'react'
import '../styles/PersonalPage.css'
import { useAuthStore } from '@/store/auth.store'

import { usePersonal } from '@/hooks/usePersonal'
import { usePersonalFilters } from '@/hooks/usePersonalFilters'
import { useUsuarioDepartamentosMap } from '@/hooks/useUsuarioDepartamentosMap'

import { getDepartamentos } from '@/services/departamentos'

import type { Usuario, UsuarioWithDepartamentos, Departamento } from '@/types'

import {
  PersonalCard,
  PersonalFilters,
  PersonalModal,
  PersonalSection,
} from '@/components/features/personal'

export function PersonalPage() {
  const isAdmin = useAuthStore(state => state.isAdmin())

  const { usuarios, loading, error, editarUsuario, eliminarUsuario, refresh } =
    usePersonal()

  const {
    mapa,
    loading: loadingMapa,
    refreshMapa,
  } = useUsuarioDepartamentosMap()

  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [selectedUsuario, setSelectedUsuario] =
    useState<UsuarioWithDepartamentos | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    getDepartamentos().then(setDepartamentos)
  }, [])

  const usuariosConDeptos: UsuarioWithDepartamentos[] = usuarios.map(u => ({
    ...u,
    departamentos: mapa.get(u.id) || [],
  }))

  const { filters, setFilters, usuariosFiltrados } =
    usePersonalFilters(usuariosConDeptos)

  if (!isAdmin)
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-alert">No autorizado</div>
        </div>
      </div>
    )

  const handleEdit = (u: Usuario) => {
    const usuarioCompleto: UsuarioWithDepartamentos = {
      ...u,
      departamentos: mapa.get(u.id) || [],
    }

    setSelectedUsuario(usuarioCompleto)
    setIsModalOpen(true)
  }

  const handleDelete = async (u: Usuario) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      await eliminarUsuario(u.id)
    }
  }

  const handleSave = async (u: Usuario, deps: number[], etiquetas: number[] = []) => {
    await editarUsuario(u, deps, etiquetas)

    await refresh()
    await refreshMapa()

    setIsModalOpen(false)
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        {error && (
          <div className="page-alert">{error}</div>
        )}

        <div>
          <h1 className="page-title">Gestión de Personal</h1>
          <p className="page-subtitle">Administra usuarios y sus departamentos</p>
        </div>

        <PersonalFilters
          filters={filters}
        departamentos={departamentos}
        onFilterChange={setFilters}
        loading={loading || loadingMapa}
      />

      <PersonalSection
        usuarios={usuariosFiltrados}
        departamentos={departamentos}
        onEditUsuario={handleEdit}
        onDeleteUsuario={handleDelete}
        loading={loading}
      />

      <div className="md:hidden space-y-4">
        {usuariosFiltrados.map(u => (
          <PersonalCard
            key={u.id}
            usuario={u}
            departamentos={departamentos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <PersonalModal
        usuario={selectedUsuario}
        departamentos={departamentos}
        isOpen={isModalOpen}
        loading={loading}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      </div>
    </div>
  )
}
