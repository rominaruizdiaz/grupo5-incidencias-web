import { useEffect, useState } from 'react'
import { useObtenerTecnicos } from '@/hooks/personal/useObtenerTecnicos'
import { getEtiquetas } from '@/services/etiquetas'
import { X, User, Badge } from 'lucide-react'
import type { Etiqueta } from '@/types'

interface AsignarTecnicoModalProps {
  isOpen: boolean
  onClose: () => void
  onAsignar: (idTecnico: number, nombreTecnico: string) => Promise<void>
  categoria?: string
  etiquetaActual?: Etiqueta | null
  loading?: boolean
}

export const AsignarTecnicoModal = ({
  isOpen,
  onClose,
  onAsignar,
  categoria,
  etiquetaActual,
  loading,
}: AsignarTecnicoModalProps) => {
  const { tecnicos, loading: loadingTecnicos } = useObtenerTecnicos()
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState<number | null>(
    null
  )
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])

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

  if (!isOpen) return null

  const tecnicosDisponibles = etiquetaActual
    ? tecnicos.filter(t => t.especialidades.includes(etiquetaActual.id!))
    : tecnicos

  const handleAsignar = async () => {
    if (!tecnicoSeleccionado) return

    const tecnico = tecnicos.find(t => t.id === tecnicoSeleccionado)
    if (!tecnico) return

    try {
      await onAsignar(tecnicoSeleccionado, tecnico.nombre)
      setTecnicoSeleccionado(null)
      onClose()
    } catch (err) {
      console.error('Error asignando:', err)
    }
  }

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Asignar Técnico
            </h2>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* INFO CATEGORIA */}
          {categoria && (
            <div className="mb-4 p-3 rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/30">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>Categoría:</strong> {categoria}
              </p>

              {etiquetaActual && (
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Filtrando técnicos por especialidad
                </p>
              )}
            </div>
          )}

          {/* LISTADO */}
          {loadingTecnicos ? (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              Cargando técnicos...
            </div>
          ) : tecnicosDisponibles.length === 0 ? (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400">
              {etiquetaActual
                ? 'No hay técnicos con esta especialidad'
                : 'No hay técnicos disponibles'}
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tecnicosDisponibles.map(tecnico => (
                <button
                  key={tecnico.id}
                  onClick={() => setTecnicoSeleccionado(tecnico.id)}
                  className={`
                    w-full p-3 rounded-xl border text-left transition
                    ${
                      tecnicoSeleccionado === tecnico.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    {/* ICON */}
                    <div className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800">
                      <User size={18} className="text-slate-700 dark:text-slate-300" />
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{tecnico.nombre}</p>

                      <p className="text-xs text-slate-600 dark:text-slate-400">{tecnico.email}</p>

                      {/* ESPECIALIDADES */}
                      {tecnico.especialidades.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {tecnico.especialidades.map(etiquetaId => {
                            const etiqueta = etiquetas.find(
                              e => e.id === etiquetaId
                            )

                            return (
                              <span
                                key={etiquetaId}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                <Badge size={12} />
                                {etiqueta
                                  ? etiqueta.nombre
                                  : `ID: ${etiquetaId}`}
                              </span>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* BOTONES */}
          <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800 mt-4">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleAsignar}
              disabled={!tecnicoSeleccionado || loading || loadingTecnicos}
              className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-700 transition"
            >
              {loading ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
