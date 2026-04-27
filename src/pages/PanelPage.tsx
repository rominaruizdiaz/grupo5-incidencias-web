import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { getDepartamentos } from '@/services/departamentos'
import { type Incidencia } from '@/types'
import { IncidenciaCard } from '@/components/features/incidencias/IncidenciaCard'
import { useNavigate } from 'react-router-dom'

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
          // Admin ve TODAS las incidencias
          filtered = incids
        } else if (usuario.rol === 2) {
          // Profesor SOLO ve las que ÉL ha creado (reportado)
          filtered = incids.filter(i => i.idUsuarioReporta === usuario.id)
        } else if (usuario.rol === 3) {
          // Técnico SOLO ve las asignadas a ÉL
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

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Panel</h1>
        <p className="text-gray-600 text-sm mt-1">
          {misDepartamentos.length > 0
            ? `Mis áreas: ${misDepartamentos.join(', ')}`
            : 'Sin departamentos asignados'}
        </p>
      </div>

      {incidencias.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No hay incidencias</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {incidencias.map(inc => (
            <IncidenciaCard
              key={inc.id}
              incidencia={inc}
              onClick={() => navigate(`/incidencia/${inc.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
