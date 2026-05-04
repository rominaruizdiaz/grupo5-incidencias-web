import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { getDepartamentos } from '@/services/departamentos'
import { type Incidencia } from '@/types'
import { IncidenciaCardNew } from '@/components/features/incidencias/IncidenciaCardNew'
import { useNavigate } from 'react-router-dom'
import { Plus, Bell } from 'lucide-react'

export const PanelPage = () => {
  const usuario = useAuthStore(state => state.usuario)
  const navigate = useNavigate()

  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [misDepartamentos, setMisDepartamentos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      if (!usuario) return

      try {
        const [incids, uds, deptos] = await Promise.all([
          getIncidencias(),
          getUsuarioDepartamentos(),
          getDepartamentos(),
        ])

        // Obtener departamentos del usuario
        const deptIds = uds
          .filter(ud => ud.usuarioId === usuario.id)
          .map(ud => ud.departamentoId)

        const nombresDepartamentos = deptos
          .filter(d => deptIds.includes(d.id!))
          .map(d => d.nombre)

        setMisDepartamentos(nombresDepartamentos)

        // Filtrar incidencias según rol
        let filtered = incids

        if (usuario.rol === 1) {
          filtered = incids
        } else if (usuario.rol === 2) {
          filtered = incids.filter(i => i.idUsuarioReporta === usuario.id)
        } else if (usuario.rol === 3) {
          filtered = incids.filter(i => i.idUsuarioAsignado === usuario.id)
        }

        setIncidencias(filtered)
      } catch (err) {
        console.error('Error cargando incidencias:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [usuario])

  const primerNombre = usuario?.nombre?.split(' ')[0] || 'Usuario'
  const textoRol =
    usuario?.rol === 1
      ? 'Dirección'
      : usuario?.rol === 2
        ? 'Profesorado'
        : 'Mantenimiento'
  const titulo =
    usuario?.rol === 2 ? 'Mis Reportes Activos' : 'Panel de Incidencias'

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Hola, {primerNombre}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {textoRol} •{' '}
              {new Date().toLocaleDateString('es-ES', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="px-6 py-6 max-w-4xl mx-auto">
        {/* TITULO */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">{titulo}</h2>

        {/* LISTA DE INCIDENCIAS */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="h-20 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : incidencias.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">
              No hay incidencias para mostrar.
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

        {/*INFO DE DEPARTAMENTOS */}
        {misDepartamentos.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 font-semibold mb-2">
              MIS ÁREAS
            </p>
            <p className="text-sm text-gray-900 font-medium">
              {misDepartamentos.join(', ')}
            </p>
          </div>
        )}
      </div>

      {usuario?.rol !== 3 && (
        <button
          onClick={() => navigate('/createIncidencia')}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  )
}
