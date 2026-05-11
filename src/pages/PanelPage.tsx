import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { getIncidencias } from '@/services/incidencias'
import { getUsuarioDepartamentos } from '@/services/usuarioDepartamentos'
import { getDepartamentos } from '@/services/departamentos'
import { type Incidencia } from '@/types'
import { IncidenciasKanban } from '@/components/features/incidencias/IncidenciasKanban'
import { Plus } from 'lucide-react'
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

        const deptIds = uds
          .filter(ud => ud.usuarioId === usuario.id)
          .map(ud => ud.departamentoId)

        const nombres = deptos
          .filter(d => deptIds.includes(d.id!))
          .map(d => d.nombre)

        setMisDepartamentos(nombres)

        let filtered = incids

        if (usuario.rol === 2) {
          filtered = incids.filter(i => i.idUsuarioReporta === usuario.id)
        } else if (usuario.rol === 3) {
          filtered = incids.filter(i => i.idUsuarioAsignado === usuario.id)
        }

        setIncidencias(filtered)
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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <div
        className="
          sticky top-0 z-20
          border-b border-slate-200 bg-white/90 backdrop-blur
          dark:border-slate-800 dark:bg-slate-950/90
        "
      >
        <div className="mx-auto w-full max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* TEXTO */}
            <div>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Hola, {primerNombre}
              </h1>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                {textoRol}
              </p>

              {misDepartamentos.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {misDepartamentos.map((d, i) => (
                    <span
                      key={i}
                      className="
                        rounded-full border border-blue-200
                        bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700
                        dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300
                      "
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* BOTÓN DESKTOP */}
            {usuario?.rol !== 3 && (
              <button
                onClick={() => navigate('/createIncidencia')}
                className="
                  hidden lg:flex
                  items-center gap-2
                  rounded-2xl
                  bg-blue-600 px-5 py-3
                  text-sm font-bold text-white
                  shadow-lg shadow-blue-600/20
                  transition
                  hover:bg-blue-700
                  active:scale-[0.98]
                "
              >
                <Plus size={18} />
                Nueva incidencia
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="mx-auto w-full max-w-[1800px] px-4 py-6 sm:px-6 lg:px-8">
        <div
          className="
            rounded-3xl border border-slate-200
            bg-white p-4 shadow-sm
            dark:border-slate-800 dark:bg-slate-900
            sm:p-6
          "
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">{titulo}</h2>

            <span
              className="
                rounded-xl border border-slate-200
                bg-slate-100 px-3 py-1
                text-xs font-semibold text-slate-600
                dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300
              "
            >
              {incidencias.length} incidencias
            </span>
          </div>

          <IncidenciasKanban incidencias={incidencias} loading={loading} />
        </div>
      </div>

      {/* FAB MOBILE */}
      {usuario?.rol !== 3 && (
        <button
          onClick={() => navigate('/createIncidencia')}
          className="
            fixed bottom-20 right-5 z-50
            flex h-14 w-14 items-center justify-center
            rounded-full
            bg-blue-600 text-white
            shadow-xl shadow-blue-600/30
            transition
            hover:scale-105 hover:bg-blue-700
            active:scale-95
            lg:hidden
          "
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  )
}
