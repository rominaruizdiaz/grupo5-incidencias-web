import { useEffect, useState } from 'react'
import type { PersonalModalProps } from './personal.types'
import { ROLE_OPTIONS } from '@/utils/personal.constants'
import type { UsuarioWithDepartamentos, Etiqueta } from '@/types'
import { getEtiquetas } from '@/services/etiquetas'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'

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
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [selectedEtiquetas, setSelectedEtiquetas] = useState<number[]>([])

  useEffect(() => {
    const fetchEtiquetas = async () => {
      try {
        const data = await getEtiquetas()
        setEtiquetas(data)
      } catch (err) {
        console.error('Error cargando etiquetas:', err)
      }
    }

    fetchEtiquetas()
  }, [])

  useEffect(() => {
    const fetchUsuarioData = async () => {
      if (usuario) {
        setFormData({ ...usuario })
        setSelectedDepartamentos(usuario.departamentos)

        if (usuario.rol === 3) {
          try {
            const etiquetasUsuario = await getEtiquetasPorUsuario(usuario.id)
            setSelectedEtiquetas(etiquetasUsuario)
          } catch (err) {
            console.error('Error cargando etiquetas del usuario:', err)
          }
        }
      }
    }

    fetchUsuarioData()
  }, [usuario])

  if (!isOpen || !formData) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await onSave(formData, selectedDepartamentos, selectedEtiquetas)
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

  const handleEtiquetaChange = (idEtiqueta: number) => {
    setSelectedEtiquetas(prev =>
      prev.includes(idEtiqueta)
        ? prev.filter(id => id !== idEtiqueta)
        : [...prev, idEtiqueta]
    )
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-96 max-w-full dark:bg-slate-950">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 dark:text-white">
            Editar Usuario
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={e =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-200">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                {ROLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                Departamentos
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2 bg-white dark:border-slate-700 dark:bg-slate-950">
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

            {formData.rol === 3 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-slate-200">
                  Especialidades
                </label>
                <p className="text-xs text-gray-500 mb-2 dark:text-slate-400">
                  Solo visible para técnicos
                </p>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2 bg-white dark:border-slate-700 dark:bg-slate-950">
                  {etiquetas.map(etiqueta => (
                    <label
                      key={etiqueta.id}
                      className="flex items-center text-slate-900 dark:text-slate-100"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEtiquetas.includes(
                          etiqueta.id!
                        )}
                        onChange={() =>
                          handleEtiquetaChange(etiqueta.id!)
                        }
                        disabled={loading}
                        className="mr-2"
                      />
                      <span className="text-sm">{etiqueta.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:border-slate-700 dark:text-slate-200"
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
