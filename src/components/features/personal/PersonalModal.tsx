import { useEffect, useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import type { PersonalModalProps } from './personal.types'
import { ROLE_OPTIONS } from '@/utils/personal.constants'
import type { UsuarioWithDepartamentos, Etiqueta } from '@/types'
import { getEtiquetas } from '@/services/etiquetas'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'

type EditingField = 'nombre' | 'email' | 'rol' | 'departamentos' | 'etiquetas' | null

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
  const [editingField, setEditingField] = useState<EditingField>(null)
  const [tempValue, setTempValue] = useState<any>(null)

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

  const handleOpenEdit = (field: EditingField) => {
    setEditingField(field)
    if (field === 'nombre') setTempValue(formData.nombre)
    else if (field === 'email') setTempValue(formData.email)
    else if (field === 'rol') setTempValue(formData.rol)
    else if (field === 'departamentos') setTempValue([...selectedDepartamentos])
    else if (field === 'etiquetas') setTempValue([...selectedEtiquetas])
  }

  const handleSaveField = async () => {
    if (!editingField || !formData) return

    if (editingField === 'nombre') {
      setFormData({ ...formData, nombre: tempValue })
    } else if (editingField === 'email') {
      setFormData({ ...formData, email: tempValue })
    } else if (editingField === 'rol') {
      setFormData({ ...formData, rol: tempValue })
    } else if (editingField === 'departamentos') {
      setSelectedDepartamentos(tempValue)
    } else if (editingField === 'etiquetas') {
      setSelectedEtiquetas(tempValue)
    }

    setEditingField(null)
  }

  const getRolLabel = (rolId: number) => {
    return ROLE_OPTIONS.find(o => o.value === rolId)?.label || 'Desconocido'
  }

  const getDepartamentosLabel = () => {
    const names = departamentos
      .filter(d => selectedDepartamentos.includes(d.id!))
      .map(d => d.nombre)
    return names.length > 0 ? names.join(', ') : 'Sin departamentos'
  }

  const getEtiquetasLabel = () => {
    const names = etiquetas
      .filter(e => selectedEtiquetas.includes(e.id!))
      .map(e => e.nombre)
    return names.length > 0 ? names.join(', ') : 'Sin especialidades'
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-[calc(100%-2rem)] sm:w-[500px] max-h-[80vh] flex flex-col dark:bg-slate-950">
        <div className="p-3 sm:p-6 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
              Editar Usuario
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-slate-800 flex-1 overflow-y-auto">
          {/* Nombre */}
          <button
            onClick={() => handleOpenEdit('nombre')}
            className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900 transition text-left"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Nombre
              </p>
              <p className="text-xs sm:text-sm text-gray-900 dark:text-slate-100 mt-0.5">
                {formData.nombre}
              </p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Email */}
          <button
            onClick={() => handleOpenEdit('email')}
            className="w-full p-3 sm:p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900 transition text-left"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Email
              </p>
              <p className="text-sm text-gray-900 dark:text-slate-100 mt-1">
                {formData.email}
              </p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Rol */}
          <button
            onClick={() => handleOpenEdit('rol')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900 transition text-left"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Rol
              </p>
              <p className="text-sm text-gray-900 dark:text-slate-100 mt-1">
                {getRolLabel(formData.rol)}
              </p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Departamentos */}
          <button
            onClick={() => handleOpenEdit('departamentos')}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900 transition text-left"
          >
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Departamentos
              </p>
              <p className="text-sm text-gray-900 dark:text-slate-100 mt-1 truncate">
                {getDepartamentosLabel()}
              </p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Especialidades */}
          {formData.rol === 3 && (
            <button
              onClick={() => handleOpenEdit('etiquetas')}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-900 transition text-left"
            >
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                  Especialidades
                </p>
                <p className="text-sm text-gray-900 dark:text-slate-100 mt-1 truncate">
                  {getEtiquetasLabel()}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        <div className="p-3 sm:p-6 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex-shrink-0">
          <button
            onClick={async () => {
              try {
                await onSave(formData, selectedDepartamentos, selectedEtiquetas)
                onClose()
              } catch {}
            }}
            disabled={loading}
            className="w-full px-4 py-3 sm:py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition text-sm sm:text-sm disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Listo'}
          </button>
        </div>
      </div>

      {/* Mini Modal para editar campo */}
      {editingField && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setEditingField(null)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-[51] w-[calc(100%-2rem)] sm:w-[500px] max-h-[75vh] flex flex-col dark:bg-slate-950">
            <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingField === 'nombre' && 'Editar Nombre'}
                {editingField === 'email' && 'Editar Email'}
                {editingField === 'rol' && 'Editar Rol'}
                {editingField === 'departamentos' && 'Editar Departamentos'}
                {editingField === 'etiquetas' && 'Editar Especialidades'}
              </h3>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
              {/* Nombre, Email */}
              {(editingField === 'nombre' || editingField === 'email') && (
                <input
                  type={editingField === 'email' ? 'email' : 'text'}
                  value={tempValue}
                  onChange={e => setTempValue(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  autoFocus
                />
              )}

              {/* Rol */}
              {editingField === 'rol' && (
                <select
                  value={tempValue}
                  onChange={e => setTempValue(parseInt(e.target.value))}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                >
                  {ROLE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {/* Departamentos */}
              {editingField === 'departamentos' && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {departamentos.map(depto => (
                    <label
                      key={depto.id}
                      className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-slate-900 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={tempValue.includes(depto.id!)}
                        onChange={e => {
                          if (e.target.checked) {
                            setTempValue([...tempValue, depto.id!])
                          } else {
                            setTempValue(
                              tempValue.filter((id: number) => id !== depto.id!)
                            )
                          }
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-900 dark:text-slate-100">
                        {depto.nombre}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {/* Etiquetas */}
              {editingField === 'etiquetas' && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {etiquetas.map(etiqueta => (
                    <label
                      key={etiqueta.id}
                      className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-slate-900 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={tempValue.includes(etiqueta.id!)}
                        onChange={e => {
                          if (e.target.checked) {
                            setTempValue([...tempValue, etiqueta.id!])
                          } else {
                            setTempValue(
                              tempValue.filter((id: number) => id !== etiqueta.id!)
                            )
                          }
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-900 dark:text-slate-100">
                        {etiqueta.nombre}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 flex-shrink-0">
              <button
                onClick={() => setEditingField(null)}
                className="flex-1 px-4 py-3 sm:py-2 border border-gray-300 rounded-lg text-gray-700 dark:border-slate-700 dark:text-slate-200 text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveField}
                disabled={loading}
                className="flex-1 px-4 py-3 sm:py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition disabled:opacity-50"
              >
                Guardar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
