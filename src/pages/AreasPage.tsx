import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { type Departamento, type Incidencia } from '@/types'
import { IncidenciaCardNew } from '@/components/features/incidencias/IncidenciaCardNew'
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react'

export function AreasPage() {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [usuarioDepartamentos, setUsuarioDepartamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedDepartamento, setExpandedDepartamento] = useState<
    number | null
  >(null)

  useEffect(() => {
    const fetch = async () => {
      if (!usuario) return

      try {
        const [deptos, incids, uds] = await Promise.all([
          getDepartamentos(),
          getIncidencias(),
          getUsuarioDepartamentos(),
        ])

        setDepartamentos(deptos)
        setIncidencias(incids)
        setUsuarioDepartamentos(uds)
      } catch (err) {
        console.error('Error cargando datos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [usuario])

  if (!usuario) return null

  const misDepartamentos = usuarioDepartamentos
    .filter(ud => ud.usuarioId === usuario.id)
    .map(ud => ud.departamentoId)

  const departamentosInfo = departamentos.filter(d =>
    misDepartamentos.includes(d.id!)
  )

  const getIncidenciasDelDepartamento = (departamentoId: number) => {
    const nombreDepartamento = departamentos.find(
      d => d.id === departamentoId
    )?.nombre
    return incidencias.filter(inc => inc.ubicacion === nombreDepartamento)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* HEADER */}
      <div className="border-b border-slate-200 px-4 py-6 dark:border-slate-800 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold sm:text-3xl">Mis Áreas</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Departamentos asignados e incidencias asociadas
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800"
              />
            ))}
          </div>
        ) : departamentosInfo.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No estás asignado a ningún departamento
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {departamentosInfo.map(area => {
              const incidenciasArea = getIncidenciasDelDepartamento(area.id!)
              const isExpanded = expandedDepartamento === area.id

              return (
                <div
                  key={area.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* HEADER DE AREA */}
                  <button
                    onClick={() =>
                      setExpandedDepartamento(isExpanded ? null : area.id!)
                    }
                    className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                        <MapPin size={20} className="text-blue-600" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-bold">{area.nombre}</h3>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                          {incidenciasArea.length}{' '}
                          {incidenciasArea.length === 1
                            ? 'incidencia'
                            : 'incidencias'}
                        </p>
                      </div>
                    </div>

                    <div className="text-slate-600 dark:text-slate-400">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </button>

                  {/* LISTA DE INCIDENCIAS */}
                  {isExpanded && (
                    <div className="space-y-3 border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
                      {incidenciasArea.length === 0 ? (
                        <p className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                          No hay incidencias en esta área
                        </p>
                      ) : (
                        incidenciasArea.map(incidencia => (
                          <IncidenciaCardNew
                            key={incidencia.id}
                            incidencia={incidencia}
                            onClick={() =>
                              navigate(`/incidencia/${incidencia.id}`)
                            }
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
