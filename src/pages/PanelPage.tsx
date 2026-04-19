import { useEffect, useState } from 'react'
import { getIncidencias } from '@/services/incidencias'
import { useAuthStore } from '@/store/authStore'
import type { Incidencia } from '@/types'

export const PanelPage = () => {
  const usuario = useAuthStore(state => state.usuario)

  const [incidencias, setIncidencias] = useState<Incidencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIncidencias()
      setIncidencias(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  // FILTRO POR ROL
  const filtered = incidencias.filter(i => {
    if (usuario?.rol === 1) return true // el admin ve todas las incidencias

    if (usuario?.rol === 2) {
      return i.idUsuarioReporta === usuario.idUsuario
    }

    if (usuario?.rol === 3) {
      return i.idUsuarioAsignado === usuario.idUsuario
    }

    return false
  })

  if (loading) return <p>Cargando...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incidencias</h1>

      <div className="grid gap-4">
        {filtered.map(inc => (
          <div key={inc.idIncidencia} className="p-4 border rounded-lg">
            <h2 className="font-bold">{inc.titulo}</h2>
            <p>{inc.descripcion}</p>
            <span className="text-sm text-gray-500">Estado: {inc.estado}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
