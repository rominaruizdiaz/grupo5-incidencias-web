import '../styles/AreaDetailPage.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth.store'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidencias } from '@/services/incidencias'
import { type Departamento, type Incidencia } from '@/types'
import { ArrowLeft, MapPin } from 'lucide-react'
import { IncidenciaCardNew } from '@/components/features/incidencias/IncidenciaCardNew'

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="space-y-3">
          <div className="h-20 w-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-20 w-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-20 w-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!area) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Área no encontrada</p>
          <button
            onClick={() => navigate('/areas')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Volver a Mis Áreas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/areas')}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MapPin size={28} className="text-blue-600" />
              {area.nombre}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-600">
              {incidencias.length}
            </p>
            <p className="text-xs text-gray-500">
              {incidencias.length === 1 ? 'incidencia' : 'incidencias'}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {incidencias.length === 0 ? (
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">
                No hay incidencias en esta área
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {incidencias.map(inc => (
                <IncidenciaCardNew
                  key={inc.id}
                  incidencia={inc}
                  onClick={() => navigate(`/incidencia/${inc.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
