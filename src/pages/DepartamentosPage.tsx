import { useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { useAdminDepartamentos } from '@/hooks/useAdminDepartamentos'
import toast from 'react-hot-toast'
import { Plus, Trash2, Edit2 } from 'lucide-react'

export function DepartamentosPage() {
  const isAdmin = useAuthStore(state => state.isAdmin())

  const { departamentos, crear, actualizar, eliminar } = useAdminDepartamentos()

  const [nombre, setNombre] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editNombre, setEditNombre] = useState('')

  if (!isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded">
          No tienes permiso para acceder a esta página
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Departamentos</h1>
          <p className="text-gray-600 mt-2">Administra departamentos y asignaciones de usuarios</p>
        </div>

        {/* CREATE DEPARTAMENTO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Crear Departamento</h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre del departamento"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={e => e.key === 'Enter' && handleCrearDepartamento()}
            />
            <button
              onClick={handleCrearDepartamento}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              Crear
            </button>
          </div>
        </div>

        {/* LIST DEPARTAMENTOS */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Departamentos</h2>
          <div className="space-y-2">
            {departamentos.length === 0 ? (
              <p className="text-gray-500">No hay departamentos creados</p>
            ) : (
              departamentos.map(d => (
                <div
                  key={d.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  {editId === d.id ? (
                    <input
                      type="text"
                      defaultValue={d.nombre}
                      onChange={e => setEditNombre(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <span className="text-gray-900 font-medium">{d.nombre}</span>
                  )}
                  <div className="flex gap-2">
                    {editId === d.id ? (
                      <>
                        <button
                          onClick={() => handleEditarDepartamento(d.id!)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition"
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
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
                        >
                          <Edit2 size={16} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminarDepartamento(d.id!)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition"
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
  )
}
