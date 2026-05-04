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
    <div className=" bg-white">
      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
        <h1 className="text-3xl font-black">Hola, {primerNombre}</h1>
        <p className="text-gray-600">{textoRol}</p>

        {misDepartamentos.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-3">
            {misDepartamentos.map((d, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="px-6 py-6 mx-auto">
        <h2 className="text-xl font-bold mb-4">{titulo}</h2>

        <IncidenciasKanban incidencias={incidencias} loading={loading} />
      </div>

      {/* BOTON DE CREAR */}
      {usuario?.rol !== 3 && (
        <button
          onClick={() => navigate('/createIncidencia')}
          className="
            fixed
            right-6
            bottom-20
            md:bottom-8
            w-14 h-14
            bg-blue-600 hover:bg-blue-700
            text-white
            rounded-full
            shadow-lg
            flex items-center justify-center
            transition-transform
            hover:scale-110
            active:scale-95
            z-50
          "
        >
          <Plus size={24} />
        </button>
      )}
    </div>
  )
}
