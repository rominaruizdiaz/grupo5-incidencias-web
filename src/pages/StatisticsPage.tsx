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

        let filtradas = data

        if (usuario) {
          if (usuario.rol === 2) {
            filtradas = data.filter(i => i.idUsuarioReporta === usuario.id)
          } else if (usuario.rol === 3) {
            filtradas = data.filter(i => i.idUsuarioAsignado === usuario.id)
          }
        }

        setIncidencias(filtradas)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [usuario])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        Cargando estadísticas...
      </div>
    )
  }

  const totalIncidencias = incidencias.length
  const incidenciasResueltas = incidencias.filter(
    i => i.estado === IncidenciaEstado.RESUELTO
  ).length

  const incidenciasEnCurso = incidencias.filter(
    i => i.estado === IncidenciaEstado.EN_CURSO
  ).length

  const incidenciasPendientes = totalIncidencias - incidenciasResueltas

  const porcentajeResuelto =
    totalIncidencias > 0 ? (incidenciasResueltas / totalIncidencias) * 100 : 0

  const chartData = [
    { name: 'Resueltas', value: incidenciasResueltas, color: '#22c55e' },
    { name: 'En Proceso', value: incidenciasEnCurso, color: '#f59e0b' },
    {
      name: 'Pendientes',
      value: incidenciasPendientes - incidenciasEnCurso,
      color: '#ef4444',
    },
  ]

  const getMensajeEstado = () => {
    if (totalIncidencias === 0) return 'Sin incidencias registradas'
    if (porcentajeResuelto === 100) return 'Todo resuelto'
    if (porcentajeResuelto >= 50) return 'Buen progreso'
    return 'Trabajo pendiente'
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER (igual PanelPage) */}
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
            <TrendingUp className="text-blue-600 dark:text-blue-400" />
            Estadísticas
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Rendimiento de incidencias
          </p>

          {usuario && (
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">
              {usuario.rol === 1 && 'Vista global'}
              {usuario.rol === 2 && 'Solo tus incidencias'}
              {usuario.rol === 3 && 'Solo asignadas'}
            </p>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* GRÁFICO */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* DONUT */}
            <div className="relative flex justify-center">
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

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-green-600 dark:text-green-400">
                  {Math.round(porcentajeResuelto)}%
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Resuelto
                </p>
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
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.value} incidencias
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400">
              {totalIncidencias}
            </p>
            <AlertCircle className="text-blue-500 mt-2" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">Resueltas</p>
            <p className="text-4xl font-black text-green-600 dark:text-green-400">
              {incidenciasResueltas}
            </p>
            <Check className="text-green-500 mt-2" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-500">En proceso</p>
            <p className="text-4xl font-black text-yellow-600 dark:text-yellow-400">
              {incidenciasEnCurso}
            </p>
            <Clock className="text-yellow-500 mt-2" />
          </div>
        </div>

        {/* MENSAJE */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="font-medium">{getMensajeEstado()}</p>
        </div>
      </div>
    </div>
  )
}
