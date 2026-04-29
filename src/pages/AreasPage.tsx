import { useEffect, useState } from 'react'
import '../styles/AreasPage.css'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { type Departamento, type Incidencia } from '@/types'
import { IncidenciaCard } from '@/components/features/incidencias/IncidenciaCard'
import { ChevronDown, ChevronUp } from 'lucide-react'

export function AreasPage() {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [usuarioDepartamentos, setUsuarioDepartamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedDepartamento, setExpandedDepartamento] = useState<number | null>(null)

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

  const departamentosInfo = departamentos.filter(d => misDepartamentos.includes(d.id!))

  const getIncidenciasDelDepartamento = (departamentoId: number) => {
    const nombreDepartamento = departamentos.find(d => d.id === departamentoId)?.nombre

    // Mostrar TODAS las incidencias de este departamento, sin filtrar por rol
    return incidencias.filter(inc => inc.ubicacion === nombreDepartamento)
  }

  return (
    <div className="page-wrapper">
      <div className="page-content space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">Mis Áreas</h1>
          <p className="text-slate-400 mt-2">
            Departamentos a los que perteneces e incidencias asociadas
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400">
            <p>Cargando áreas...</p>
          </div>
        ) : departamentosInfo.length === 0 ? (
          <div className="page-card text-center">
            <p className="text-slate-400">
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
                  className="page-card overflow-hidden"
                >
                  {/* HEADER ÁREA */}
                  <div
                    className="page-area-header"
                    onClick={() =>
                      setExpandedDepartamento(isExpanded ? null : area.id!)
                    }
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="page-dot-blue"></div>
                      <div className="text-left">
                        <h2 className="text-lg font-semibold text-white">
                          {area.nombre}
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">
                          {incidenciasArea.length}{' '}
                          {incidenciasArea.length === 1 ? 'incidencia' : 'incidencias'}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-slate-400" />
                    ) : (
                      <ChevronDown className="text-slate-400" />
                    )}
                  </div>

                  {/* INCIDENCIAS */}
                  {isExpanded && incidenciasArea.length > 0 && (
                    <div className="page-area-body space-y-3">
                      {incidenciasArea.map(incidencia => (
                        <IncidenciaCard
                          key={incidencia.id}
                          incidencia={incidencia}
                          onClick={() => navigate(`/incidencia/${incidencia.id}`)}
                        />
                      ))}
                    </div>
                  )}

                  {isExpanded && incidenciasArea.length === 0 && (
                    <div className="page-area-body text-center text-slate-400">
                      No hay incidencias en esta área
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
