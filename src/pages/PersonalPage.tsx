import { useState, useEffect } from 'react'
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
  DeleteUsuarioModal,
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
  const [usuarioToDelete, setUsuarioToDelete] =
    useState<Usuario | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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

  const handleDelete = (u: Usuario) => {
    setUsuarioToDelete(u)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (usuarioToDelete) {
      await eliminarUsuario(usuarioToDelete.id)
      setUsuarioToDelete(null)
      setIsDeleteModalOpen(false)
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
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <div
        className="
        sticky top-0 z-20
        border-b border-slate-200
        bg-white/90 backdrop-blur
        dark:border-slate-800 dark:bg-slate-950/90
      "
      >
        <div
          className="
          mx-auto flex w-full max-w-[1800px]
          flex-col gap-4
          px-4 py-4
          sm:px-6
          lg:flex-row lg:items-center lg:justify-between lg:px-8
        "
        >
          {/* TEXTO */}
          <div className="min-w-0 flex-1">
            <h1
              className="
              flex items-center gap-3
              text-2xl font-black tracking-tight
              sm:text-3xl lg:text-4xl
            "
            >
              <Users
                size={32}
                className="flex-shrink-0 text-blue-600 dark:text-blue-400"
              />

              <span className="truncate">Gestión de Personal</span>
            </h1>

            <p
              className="
              mt-2
              text-sm text-slate-600
              dark:text-slate-400
              sm:text-base
            "
            >
              Administra usuarios y sus departamentos
            </p>
          </div>

          {/* STATS */}
          <div
            className="
            flex w-full items-center justify-center
            rounded-2xl border border-slate-200
            bg-slate-100 px-4 py-3
            text-sm font-semibold text-slate-700
            dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300
            sm:w-auto
          "
          >
            {usuariosFiltrados.length} usuarios
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div
        className="
        mx-auto w-full max-w-[1800px]
        px-3 py-4
        sm:px-6 sm:py-6
        lg:px-8
      "
      >
        <div className="space-y-5 sm:space-y-6">
          {/* ERROR */}
          {error && (
            <div
              className="
              rounded-2xl border border-red-200
              bg-red-50 p-4
              text-sm font-medium text-red-700
              dark:border-red-900 dark:bg-red-950/40 dark:text-red-300
            "
            >
              {error}
            </div>
          )}

          {/* FILTROS */}

          <PersonalFilters
            filters={filters}
            departamentos={departamentos}
            onFilterChange={setFilters}
            loading={loading || loadingMapa}
          />

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">
            <div
              className="
      rounded-3xl
      border border-slate-200
      bg-white shadow-sm
      dark:border-slate-800
      dark:bg-slate-900
    "
            >
              <div className="w-full overflow-x-auto">
                <div className="p-4 lg:p-6">
                  <PersonalSection
                    usuarios={usuariosFiltrados}
                    departamentos={departamentos}
                    onEditUsuario={handleEdit}
                    onDeleteUsuario={handleDelete}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
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

          {/* EMPTY */}
          {!loading && usuariosFiltrados.length === 0 && (
            <div
              className="
              rounded-3xl border border-slate-200
              bg-white px-6 py-14
              text-center
              dark:border-slate-800 dark:bg-slate-900
            "
            >
              <Users
                size={42}
                className="mx-auto mb-4 text-slate-400 dark:text-slate-600"
              />

              <h3 className="text-lg font-bold">No hay usuarios disponibles</h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Ajusta los filtros o añade nuevos usuarios.
              </p>
            </div>
          )}

          {/* MODAL */}
          <PersonalModal
            usuario={selectedUsuario}
            departamentos={departamentos}
            isOpen={isModalOpen}
            loading={loading}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />

          {/* DELETE MODAL */}
          <DeleteUsuarioModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false)
              setUsuarioToDelete(null)
            }}
            onConfirm={handleConfirmDelete}
            loading={loading}
            nombreUsuario={usuarioToDelete?.nombre}
          />
        </div>
      </div>
    </div>
  )
}
