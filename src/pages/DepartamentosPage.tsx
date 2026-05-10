import { useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useAdminDepartamentos } from '@/hooks/departamentos/useAdminDepartamentos'
import toast from 'react-hot-toast'
import { Plus, Trash2, Edit2, Building } from 'lucide-react'
import { Input, Button } from '@/components/ui'

export function DepartamentosPage() {
  const isAdmin = useAuthStore(state => state.isAdmin())
  const { departamentos, crear, actualizar, eliminar } = useAdminDepartamentos()

  const [nombre, setNombre] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editNombre, setEditNombre] = useState('')

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-slate-900">
          <p className="font-bold text-red-600 dark:text-red-400">
            No autorizado
          </p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            No tienes permiso para acceder a esta sección
          </p>
        </div>
      </div>
    )
  }

  const handleCrear = async () => {
    if (!nombre.trim()) return toast.error('Nombre requerido')
    await crear(nombre)
    setNombre('')
    toast.success('Departamento creado')
  }

  const handleEditar = async (id: number) => {
    if (!editNombre.trim()) return toast.error('Nombre requerido')
    await actualizar(id, editNombre)
    setEditId(null)
    toast.success('Actualizado')
  }

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Eliminar este departamento?')) return
    await eliminar(id)
    toast.success('Eliminado')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER (igual estilo PanelPage) */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <Building className="text-blue-600 dark:text-blue-400" />
            Departamentos
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Gestión de estructura organizativa
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* CREAR */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <h2 className="text-lg font-bold mb-4">Crear departamento</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre del departamento"
              onKeyDown={e => e.key === 'Enter' && handleCrear()}
            />

            <Button icon={<Plus size={18} />} onClick={handleCrear}>
              Crear
            </Button>
          </div>
        </div>

        {/* LISTA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <h2 className="text-lg font-bold mb-4">
            {departamentos.length === 0
              ? 'Sin departamentos'
              : `Departamentos (${departamentos.length})`}
          </h2>

          <div className="space-y-3">
            {departamentos.length === 0 ? (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <Building className="mx-auto mb-2 opacity-40" />
                No hay departamentos creados
              </div>
            ) : (
              departamentos.map(d => (
                <div
                  key={d.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  {/* LEFT */}
                  {editId === d.id ? (
                    <input
                      className="w-full rounded-lg border border-blue-300 px-3 py-2 bg-white dark:bg-slate-900"
                      defaultValue={d.nombre}
                      onChange={e => setEditNombre(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-2 font-medium">
                      <Building size={16} className="text-blue-500" />
                      {d.nombre}
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    {editId === d.id ? (
                      <>
                        <button
                          onClick={() => handleEditar(d.id!)}
                          className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm"
                        >
                          Guardar
                        </button>

                        <button
                          onClick={() => setEditId(null)}
                          className="px-3 py-2 rounded-lg bg-slate-400 text-white text-sm"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(d.id!)
                            setEditNombre(d.nombre)
                          }}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                        >
                          <Edit2 size={14} />
                          Editar
                        </button>

                        <button
                          onClick={() => handleEliminar(d.id!)}
                          className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-600 text-white text-sm"
                        >
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
