import { useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useAdminDepartamentos } from '@/hooks/useAdminDepartamentos'
import toast from 'react-hot-toast'
import { Plus, Trash2, Edit2, Building } from 'lucide-react'
import { Input, Button } from '@/components/features/ui'

export function DepartamentosPage() {
  const isAdmin = useAuthStore(state => state.isAdmin())

  const { departamentos, crear, actualizar, eliminar } = useAdminDepartamentos()

  const [nombre, setNombre] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editNombre, setEditNombre] = useState('')

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg border border-red-200 max-w-md text-center">
          <p className="font-semibold"> No autorizado</p>
          <p className="text-sm mt-2">
            No tienes permiso para acceder a esta página
          </p>
        </div>
      </div>
    )
  }

  const handleCrearDepartamento = async () => {
    if (!nombre.trim()) {
      toast.error('El nombre del departamento no puede estar vacío')
      return
    }
    try {
      await crear(nombre)
      setNombre('')
      toast.success('Departamento creado')
    } catch (err) {
      toast.error('Error al crear departamento')
    }
  }

  const handleEditarDepartamento = async (id: number) => {
    if (!editNombre.trim()) {
      toast.error('El nombre no puede estar vacío')
      return
    }
    try {
      await actualizar(id, editNombre)
      setEditId(null)
      toast.success('Departamento actualizado')
    } catch (err) {
      toast.error('Error al actualizar departamento')
    }
  }

  const handleEliminarDepartamento = async (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este departamento?')) {
      try {
        await eliminar(id)
        toast.success('Departamento eliminado')
      } catch (err) {
        toast.error('Error al eliminar departamento')
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building size={32} className="text-blue-600" />
            Gestión de Departamentos
          </h1>
          <p className="text-gray-600 mt-2">
            Administra departamentos y sus configuraciones
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* CREATE DEPARTAMENTO */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Crear Nuevo Departamento
            </h2>
            <div className="flex gap-3">
              <Input
                type="text"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                placeholder="Nombre del departamento"
                onKeyDown={e => e.key === 'Enter' && handleCrearDepartamento()}
              />
              <Button
                onClick={handleCrearDepartamento}
                variant="primary"
                size="md"
                icon={<Plus size={18} />}
              >
                Crear
              </Button>
            </div>
          </div>

          {/* LISTAR DEPARTAMENTOS */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              {departamentos.length === 0
                ? 'No hay departamentos'
                : `Departamentos (${departamentos.length})`}
            </h2>
            <div className="space-y-2">
              {departamentos.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Building size={32} className="mx-auto mb-2 opacity-50" />
                  <p>
                    No hay departamentos creados. Crea uno arriba para comenzar.
                  </p>
                </div>
              ) : (
                departamentos.map(d => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition border border-gray-200"
                  >
                    {editId === d.id ? (
                      <input
                        type="text"
                        defaultValue={d.nombre}
                        onChange={e => setEditNombre(e.target.value)}
                        className="flex-1 px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center gap-3 flex-1">
                        <Building
                          size={20}
                          className="text-blue-600 flex-shrink-0"
                        />
                        <span className="text-gray-900 font-semibold">
                          {d.nombre}
                        </span>
                      </div>
                    )}
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      {editId === d.id ? (
                        <>
                          <button
                            onClick={() => handleEditarDepartamento(d.id!)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-medium text-sm transition"
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
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                          >
                            <Edit2 size={16} />
                            Editar
                          </button>
                          <button
                            onClick={() => handleEliminarDepartamento(d.id!)}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                          >
                            <Trash2 size={16} />
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
    </div>
  )
}
