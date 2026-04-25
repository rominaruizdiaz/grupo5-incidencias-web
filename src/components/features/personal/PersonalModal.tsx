import { useEffect, useState } from 'react'
import type { PersonalModalProps } from './personal.types'
import { ROLE_OPTIONS } from '@/utils/personal.constants'
import type { UsuarioWithDepartamentos } from '@/types'

export function PersonalModal({
  usuario,
  departamentos,
  isOpen,
  loading,
  onClose,
  onSave,
}: PersonalModalProps) {
  const [formData, setFormData] = useState<UsuarioWithDepartamentos | null>(
    null
  )
  const [selectedDepartamentos, setSelectedDepartamentos] = useState<number[]>(
    []
  )

  useEffect(() => {
    if (usuario) {
      setFormData({ ...usuario })
      setSelectedDepartamentos(usuario.departamentos)
    }
  }, [usuario])

  if (!isOpen || !formData) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await onSave(formData, selectedDepartamentos)
      onClose()
    } catch {}
  }

  const handleDepartamentoChange = (idDepartamento: number) => {
    setSelectedDepartamentos(prev =>
      prev.includes(idDepartamento)
        ? prev.filter(id => id !== idDepartamento)
        : [...prev, idDepartamento]
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-96 max-w-full">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Editar Usuario
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={e =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                disabled={loading}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol
              </label>
              <select
                value={formData.rol}
                onChange={e =>
                  setFormData({
                    ...formData,
                    rol: parseInt(e.target.value),
                  })
                }
                disabled={loading}
                className="w-full px-3 py-2 border rounded-md"
              >
                {ROLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamentos
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                {departamentos.map(depto => (
                  <label
                    key={depto.id}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDepartamentos.includes(
                        depto.id!
                      )}
                      onChange={() =>
                        handleDepartamentoChange(depto.id!)
                      }
                      disabled={loading}
                      className="mr-2"
                    />
                    <span className="text-sm">{depto.nombre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border rounded-md"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
