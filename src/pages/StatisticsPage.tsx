import { useEffect, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/auth.store'
import { type Incidencia, IncidenciaEstado } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Check, AlertCircle, Clock, TrendingUp } from 'lucide-react'

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
    {
      name: 'Pendientes',
      value: incidenciasPendientes - incidenciasEnCurso,
      color: '#ef4444',
    },
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
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-200 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={32} className="text-blue-600" />
            Estadísticas
          </h1>
          <p className="text-gray-600 mt-2">
            Rendimiento en la resolución de incidencias
          </p>

          {usuario && (
            <p className="text-xs text-gray-500 mt-3 font-medium">
              {usuario.rol === 1 && 'Mostrando estadísticas globales (Admin)'}
              {usuario.rol === 2 &&
                'Mostrando solo tus incidencias reportadas (Profesor)'}
              {usuario.rol === 3 &&
                'Mostrando solo tus incidencias asignadas (Técnico)'}
            </p>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* GRAFICA DONUT */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* GRÁFICO */}
              <div className="flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
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
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* CENTRO DEL DONUT */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="text-4xl font-bold text-green-600">
                    {Math.round(porcentajeResuelto)}%
                  </div>
                  <p className="text-gray-600 text-sm">Resuelto</p>
                </div>
              </div>

              {/* LEYENDA */}
              <div className="space-y-4">
                {chartData.map(item => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.value} incidencias
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RESUMEN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-blue-50 p-6">
              <p className="text-sm font-semibold">Total</p>
              <p className="text-4xl font-black text-blue-900">
                {totalIncidencias}
              </p>
              <AlertCircle className="text-blue-600 mt-2" />
            </div>

            <div className="rounded-2xl border bg-green-50 p-6">
              <p className="text-sm font-semibold">Resueltas</p>
              <p className="text-4xl font-black text-green-900">
                {incidenciasResueltas}
              </p>
              <Check className="text-green-600 mt-2" />
            </div>

            <div className="rounded-2xl border bg-orange-50 p-6">
              <p className="text-sm font-semibold">En Proceso</p>
              <p className="text-4xl font-black text-orange-900">
                {incidenciasEnCurso}
              </p>
              <Clock className="text-orange-600 mt-2" />
            </div>
          </div>

          {/* MENSAJE */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-center font-semibold text-blue-900">
              {getMensajeEstado()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
