/* import { useState, useEffect } from 'react'
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

  if (!isAdmin) return <div>No autorizado</div>

  const handleEdit = (u: Usuario) => {
    const usuarioCompleto: UsuarioWithDepartamentos = {
      ...u,
      departamentos: mapa.get(u.id) || [],
    }

    setSelectedUsuario(usuarioCompleto)
    setIsModalOpen(true)
  }

  const handleDelete = async (u: Usuario) => {
    await eliminarUsuario(u.id)
  }

  const handleSave = async (u: Usuario, deps: number[]) => {
    await editarUsuario(u, deps)

    await refresh() // usuarios
    await refreshMapa() // relaciones con los departamentos

    setIsModalOpen(false)
  }

  return (
    <div className="p-6">
      {error && <div>{error}</div>}

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

      <div className="space-y-4">
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
  )
}
 */
