import '../styles/DepartamentosPage.css'
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
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-alert">
            No tienes permiso para acceder a esta página
          </div>
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
    <div className="page-wrapper">
      <div className="page-content space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Departamentos</h1>
          <p className="text-slate-400 mt-2">Administra departamentos y asignaciones de usuarios</p>
        </div>

        {/* CREATE DEPARTAMENTO */}
        <div className="page-card">
          <h2 className="text-xl font-semibold mb-4 text-white">Crear Departamento</h2>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Nombre del departamento"
              className="page-input"
              onKeyDown={e => e.key === 'Enter' && handleCrearDepartamento()}
            />
            <button
              onClick={handleCrearDepartamento}
              className="page-button flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Crear
            </button>
          </div>
        </div>

        {/* LIST DEPARTAMENTOS */}
        <div className="page-card">
          <h2 className="text-xl font-semibold mb-4 text-white">Departamentos</h2>
          <div className="space-y-2">
            {departamentos.length === 0 ? (
              <p className="text-slate-400">No hay departamentos creados</p>
            ) : (
              departamentos.map(d => (
                <div
                  key={d.id}
                  className="page-row"
                >
                  {editId === d.id ? (
                    <input
                      type="text"
                      defaultValue={d.nombre}
                      onChange={e => setEditNombre(e.target.value)}
                      className="page-input"
                      autoFocus
                    />
                  ) : (
                    <span className="text-slate-100 font-medium">{d.nombre}</span>
                  )}
                  <div className="flex gap-2">
                    {editId === d.id ? (
                      <>
                        <button
                          onClick={() => handleEditarDepartamento(d.id!)}
                          className="page-button-save"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="page-button-cancel"
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
                          className="page-button-edit"
                        >
                          <Edit2 size={16} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminarDepartamento(d.id!)}
                          className="page-button-delete"
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
