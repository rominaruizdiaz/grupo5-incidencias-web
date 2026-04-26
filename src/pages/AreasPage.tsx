import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { type Departamento, type Incidencia } from '@/types'
import { ChevronDown } from 'lucide-react'

export function AreasPage() {
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [usuarioDepartamentos, setUsuarioDepartamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

    return incidencias.filter(inc => {
      const perteneceAlArea = inc.ubicacion === nombreDepartamento
      if (!perteneceAlArea) return false

      if (usuario.rol === 1) return true
      if (usuario.rol === 2) return inc.idUsuarioReporta === usuario.id
      if (usuario.rol === 3) return inc.idUsuarioAsignado === usuario.id
      return false
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Áreas</h1>
          <p className="text-gray-600 mt-2">
            Departamentos a los que perteneces e incidencias asociadas
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <p>Cargando áreas...</p>
          </div>
        ) : departamentosInfo.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">
              No estás asignado a ningún departamento
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {departamentosInfo.map(area => {
              const incidenciasArea = getIncidenciasDelDepartamento(area.id!)

              return (
                <div
                  key={area.id}
                  className="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate(`/areas/${area.id}`)}
                >
                  {/* HEADER ÁREA */}
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <div className="text-left">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {area.nombre}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {incidenciasArea.length}{' '}
                          {incidenciasArea.length === 1 ? 'incidencia' : 'incidencias'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="text-gray-600" />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
