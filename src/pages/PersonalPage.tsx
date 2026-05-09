import { useState, useEffect } from 'react'
import '../styles/PersonalPage.css'
import { useAuthStore } from '@/store/auth.store'

import { usePersonal } from '@/hooks/personal/usePersonal'
import { usePersonalFilters } from '@/hooks/personal/usePersonalFilters'
import { useUsuarioDepartamentosMap } from '@/hooks/personal/useUsuarioDepartamentosMap'

import { getDepartamentos } from '@/services/departamentos'

import type { Usuario, UsuarioWithDepartamentos, Departamento } from '@/types'

import {
  PersonalCard,
  PersonalFilters,
  PersonalModal,
  PersonalSection,
} from '@/components/features/personal'
import { Users } from 'lucide-react'

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

  const handleSave = async (
    u: Usuario,
    deps: number[],
    etiquetas: number[] = []
  ) => {
    await editarUsuario(u, deps, etiquetas)

    await refresh()
    await refreshMapa()

    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <div className="border-b border-gray-200 bg-white px-6 py-6 dark:border-slate-700 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 dark:text-white">
            <Users size={32} className="text-blue-600" />
            Gestión de Personal
          </h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            Administra usuarios y sus departamentos
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {error && (
            <div className="bg-red-50 border border-gray-200 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

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
    </div>
  )
}
