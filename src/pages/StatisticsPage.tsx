import { useEffect, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { type Incidencia, IncidenciaEstado } from '@/types'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Check, AlertCircle, Clock } from 'lucide-react'

export const StatisticsPage = () => {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getIncidencias()
        setIncidencias(data)
      } catch (err) {
        console.error('Error cargando incidencias:', err)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <p className="text-gray-500">Cargando estadísticas...</p>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estadísticas</h1>
          <p className="text-gray-600 mt-2">
            Rendimiento en la resolución de incidencias
          </p>
        </div>

        {/* GRÁFICO CIRCULAR */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* GRÁFICO */}
            <div className="flex flex-col items-center">
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
              <div className="text-center -mt-12 mb-4">
                <div className="text-5xl font-bold text-green-600">
                  {Math.round(porcentajeResuelto)}%
                </div>
                <p className="text-gray-600 text-sm mt-2">Resuelto</p>
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
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.value} incidencias</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TARJETAS DE RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {totalIncidencias}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <AlertCircle className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          {/* Resueltas */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Resueltas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {incidenciasResueltas}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Check className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          {/* En Proceso */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">En Proceso</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {incidenciasEnCurso}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* MENSAJE DE ESTADO */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-blue-900 font-medium">{getMensajeEstado()}</p>
        </div>

        {/* ESTADÍSTICAS POR ESTADO */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Desglose por Estado
          </h2>
          <div className="space-y-3">
            {[
              {
                estado: IncidenciaEstado.ACTIVO,
                label: 'Activas',
                color: 'bg-blue-100 text-blue-800',
              },
              {
                estado: IncidenciaEstado.EN_CURSO,
                label: 'En Curso',
                color: 'bg-purple-100 text-purple-800',
              },
              {
                estado: IncidenciaEstado.RESUELTO,
                label: 'Resueltas',
                color: 'bg-green-100 text-green-800',
              },
            ].map(item => {
              const count = incidencias.filter(
                i => i.estado === item.estado
              ).length
              const percentage =
                totalIncidencias > 0 ? ((count / totalIncidencias) * 100).toFixed(1) : 0
              return (
                <div key={item.estado} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded font-medium ${item.color}`}>
                      {item.label}
                    </span>
                    <span className="text-gray-600">{count} incidencias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color.split(' ')[0]}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-600 text-sm w-12 text-right">
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
