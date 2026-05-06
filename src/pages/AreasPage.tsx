import { useEffect, useState } from 'react'
import '../styles/AreasPage.css'
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
    <div className="bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-200 px-6 py-6">
        <h1 className="text-3xl font-bold text-gray-900">Mis Áreas</h1>
        <p className="text-gray-600 text-sm mt-2">
          Departamentos asignados e incidencias asociadas
        </p>
      </div>

      {/* CONTENIDO */}
      <div className="p-6 max-w-4xl mx-auto">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-20 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : departamentosInfo.length === 0 ? (
          <div className="text-center py-12">
            {/* SVG bandera de españa */}
            <div className="text-4xl mb-3"></div>
            <p className="text-gray-500 text-sm">
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
                  className="rounded-2xl bg-gray-50 border border-gray-200 overflow-hidden"
                >
                  {/* HEADER DE AREA */}
                  <button
                    onClick={() =>
                      setExpandedDepartamento(isExpanded ? null : area.id!)
                    }
                    className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition text-left"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900">
                          {area.nombre}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">
                          {incidenciasArea.length}{' '}
                          {incidenciasArea.length === 1
                            ? 'incidencia'
                            : 'incidencias'}
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-600 transition">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </button>

                  {/* LISTA DE INCIDENCIAS */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 px-4 py-4 bg-white space-y-3">
                      {incidenciasArea.length === 0 ? (
                        <div className="text-center py-6 text-gray-500 text-sm">
                          No hay incidencias en esta área
                        </div>
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
