import { useEffect, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'
import { type Incidencia, IncidenciaEstado } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Check, AlertCircle, Clock } from 'lucide-react'
import '../styles/StatisticsPage.css'

export const StatisticsPage = () => {
  const usuario = useAuthStore(state => state.usuario)
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getIncidencias()

        // Filtrar según el rol del usuario
        let filtradas = data
        if (usuario) {
          if (usuario.rol === 2) {
            // Profesor: solo sus incidencias (idUsuarioReporta = su id)
            filtradas = data.filter(i => i.idUsuarioReporta === usuario.id)
          } else if (usuario.rol === 3) {
            // Técnico: solo sus asignaciones (idUsuarioAsignado = su id)
            filtradas = data.filter(i => i.idUsuarioAsignado === usuario.id)
          }
          // Admin (rol 1): ve todas, sin filtro
        }

        setIncidencias(filtradas)
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
      <div className="page-wrapper flex items-center justify-center">
        <div className="page-content">
          <p className="text-slate-400">Cargando estadísticas...</p>
        </div>
      </div>
    )
  }

  // Cálculos de métricas
  const totalIncidencias = incidencias.length
  const incidenciasResueltas = incidencias.filter(
    i => i.estado === IncidenciaEstado.RESUELTO
  ).length
  const incidenciasPendientes = totalIncidencias - incidenciasResueltas
  const incidenciasEnCurso = incidencias.filter(
    i => i.estado === IncidenciaEstado.EN_CURSO
  ).length
  const porcentajeResuelto =
    totalIncidencias > 0 ? (incidenciasResueltas / totalIncidencias) * 100 : 0

  // Datos para el gráfico
  const chartData = [
    { name: 'Resueltas', value: incidenciasResueltas, color: '#10b981' },
    { name: 'En Proceso', value: incidenciasEnCurso, color: '#f59e0b' },
    { name: 'Pendientes', value: incidenciasPendientes - incidenciasEnCurso, color: '#ef4444' },
  ]

  // Mensaje de estado
  const getMensajeEstado = () => {
    if (totalIncidencias === 0)
      return 'El sistema está al día. No hay incidencias registradas.'
    if (porcentajeResuelto === 100)
      return '¡Excelente trabajo! Todas las incidencias han sido solucionadas.'
    if (porcentajeResuelto >= 50)
      return 'Buen ritmo. Más de la mitad de los problemas ya están resueltos.'
    return 'Hay trabajo por delante. Revisad las incidencias urgentes primero.'
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        {/* HEADER */}
        <div className="stats-header">
          <h1 className="stats-header-title">Métricas del Centro</h1>
          <p className="stats-header-subtitle">
            Rendimiento en resolución de incidencias
          </p>
          {usuario && (
            <p className="text-sm text-slate-400 mt-2">
              {usuario.rol === 1 && '📊 Mostrando estadísticas globales (Admin)'}
              {usuario.rol === 2 && '📋 Mostrando solo tus incidencias reportadas (Profesor)'}
              {usuario.rol === 3 && '🔧 Mostrando solo tus incidencias asignadas (Técnico)'}
            </p>
          )}
        </div>

        {/* GRÁFICO CIRCULAR */}
        <div className="stats-card stats-chart-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* GRÁFICO */}
            <div className="stats-chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* PORCENTAJE EN EL CENTRO */}
              <div className="stats-chart-center">
                <div className="stats-result">
                  {Math.round(porcentajeResuelto)}%
                </div>
                <p className="stats-result-label">Resuelto</p>
              </div>
            </div>

            {/* LEYENDA */}
            <div className="space-y-4">
              {chartData.map(item => (
                <div key={item.name} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-100">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.value} incidencias</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TARJETAS DE RESUMEN */}
        <div className="stats-summary-grid">
          {/* Resueltas */}
          <div className="stats-summary-item border-l-4 border-emerald-500">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="stats-summary-label">Resueltas</p>
                <p className="stats-summary-value">{incidenciasResueltas}</p>
              </div>
              <div className="stats-icon-bg-emerald">
                <Check className="text-emerald-300" size={24} />
              </div>
            </div>
          </div>

          {/* En Cola */}
          <div className="stats-summary-item border-l-4 border-sky-500">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="stats-summary-label">En Cola</p>
                <p className="stats-summary-value">{incidenciasPendientes}</p>
              </div>
              <div className="stats-icon-bg-sky">
                <Clock className="text-sky-300" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* MENSAJE DE ESTADO */}
        <div className="stats-banner">
          <p className="font-medium">{getMensajeEstado()}</p>
        </div>

        {/* ESTADÍSTICAS POR ESTADO */}
        <div className="stats-card">
          <h2 className="text-lg font-bold text-slate-100 mb-4">
            Desglose por Estado
          </h2>
          <div className="space-y-4">
            {[
              {
                estado: IncidenciaEstado.ACTIVO,
                label: 'Activas',
                badgeClass: 'stats-badge-blue',
                barColor: 'bg-sky-400',
              },
              {
                estado: IncidenciaEstado.EN_CURSO,
                label: 'En Curso',
                badgeClass: 'stats-badge-purple',
                barColor: 'bg-violet-400',
              },
              {
                estado: IncidenciaEstado.RESUELTO,
                label: 'Resueltas',
                badgeClass: 'stats-badge-green',
                barColor: 'bg-emerald-400',
              },
            ].map(item => {
              const count = incidencias.filter(
                i => i.estado === item.estado
              ).length
              const percentage =
                totalIncidencias > 0 ? ((count / totalIncidencias) * 100).toFixed(1) : 0
              return (
                <div key={item.estado} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`stats-badge ${item.badgeClass}`}>
                      {item.label}
                    </span>
                    <span className="text-slate-400 text-sm">{count} incidencias</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="stats-bar-bg flex-1">
                      <div
                        className={`stats-bar-fill ${item.barColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-slate-400 text-sm w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
