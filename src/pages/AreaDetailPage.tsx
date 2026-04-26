import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidencias } from '@/services/incidencias'
import { type Departamento, type Incidencia } from '@/types'
import { ChevronLeft } from 'lucide-react'

export function AreaDetailPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const navigate = useNavigate()
  const usuario = useAuthStore(state => state.usuario)

  const [area, setArea] = useState<Departamento | null>(null)
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (!usuario || !areaId) return

      try {
        const [deptos, incids] = await Promise.all([
          getDepartamentos(),
          getIncidencias(),
        ])

        const foundArea = deptos.find(d => d.id === parseInt(areaId))
        setArea(foundArea || null)

        const filtered = incids.filter(inc => {
          const perteneceAlArea = inc.ubicacion === foundArea?.nombre
          if (!perteneceAlArea) return false

          // Filtrar según rol
          if (usuario.rol === 1) {
            // Admin ve todas del área
            return true
          } else if (usuario.rol === 2) {
            // Profesor SOLO ve las que ÉL creó
            return inc.idUsuarioReporta === usuario.id
          } else if (usuario.rol === 3) {
            // Técnico SOLO ve las asignadas a ÉL
            return inc.idUsuarioAsignado === usuario.id
          }
          return false
        })

        setIncidencias(filtered)
      } catch (err) {
        console.error('Error cargando datos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [usuario, areaId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12 text-gray-500">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!area) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center py-12 text-gray-500">
          <p>Área no encontrada</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/areas')}
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{area.nombre}</h1>
            <p className="text-gray-600 mt-1">
              {incidencias.length}{' '}
              {incidencias.length === 1 ? 'incidencia' : 'incidencias'}
            </p>
          </div>
        </div>

        {/* INCIDENCIAS */}
        <div className="bg-white rounded-lg shadow p-6">
          {incidencias.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No hay incidencias en este área</p>
            </div>
          ) : (
            <div className="space-y-4">
              {incidencias.map(inc => (
                <div
                  key={inc.id}
                  onClick={() => navigate(`/incidencia/${inc.id}`)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow transition cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {inc.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {inc.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {inc.categoria}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {inc.ubicacion}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            inc.urgencia === 'Alta'
                              ? 'bg-red-100 text-red-800'
                              : inc.urgencia === 'Media'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {inc.urgencia}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            inc.estado === 'Activo'
                              ? 'bg-blue-100 text-blue-800'
                              : inc.estado === 'En curso'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {inc.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
