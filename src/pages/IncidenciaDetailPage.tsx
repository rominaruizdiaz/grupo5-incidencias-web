import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { useIncidencias } from '@/hooks/useIncidencias'
import { useAuthStore } from '@/store/auth.store'
import { useParams } from 'react-router-dom'
import { DeleteIncidenciaButton } from '@/components/features/incidencias/DeleteIncidenciaButton'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const usuario = useAuthStore(state => state.usuario)
  const { incidencias, getNombreUsuario } = useIncidencias()

  const incidencia = incidencias.find(i => i.id === Number(id))

  const form = useIncidenciaForm(incidencia)

  if (!incidencia) return <p>No encontrada</p>

  // Calcular permisos
  const esCreador = usuario?.id === incidencia.idUsuarioReporta
  const esAdmin = usuario?.rol === 1
  const esTecnico = usuario?.rol === 3
  const esAsignado = usuario?.id === incidencia.idUsuarioAsignado

  // Permisos de edición
  const puedeEditarTextos = (esCreador || esAdmin) && incidencia.estado !== 'Resuelto'
  const puedeResolverEnumerations = (esTecnico && esAsignado) || esAdmin
  const puedeAsignar = esAdmin
  const puedeEliminar = (esCreador && incidencia.estado !== 'Resuelto') || esAdmin

  if (!puedeEditarTextos && !puedeResolverEnumerations && !puedeAsignar) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 inline-block">
          <p className="text-red-900 font-semibold">
            No tienes permiso para ver o editar esta incidencia.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {puedeEliminar && <DeleteIncidenciaButton id={incidencia.id} />}

        {puedeAsignar && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Asignar Técnico
          </button>
        )}

        {puedeResolverEnumerations && incidencia.estado !== 'Resuelto' && (
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Marcar como Resuelto
          </button>
        )}
      </div>

      {puedeEditarTextos ? (
        <IncidenciaForm
          mode="edit"
          onSubmit={form.submit}
          titulo={form.titulo}
          setTitulo={form.setTitulo}
          descripcion={form.descripcion}
          setDescripcion={form.setDescripcion}
          categoria={form.categoria}
          setCategoria={form.setCategoria}
          ubicacion={form.ubicacion}
          setUbicacion={form.setUbicacion}
          urgencia={form.urgencia}
          setUrgencia={form.setUrgencia}
          estado={incidencia.estado}
          setEstado={form.setEstado}
          fecha={incidencia.fecha}
          reportadoPor={getNombreUsuario(incidencia.idUsuarioReporta)}
          loading={form.loading}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Título</p>
            <p className="text-lg font-semibold text-gray-900">{incidencia.titulo}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Descripción</p>
            <p className="text-gray-700">{incidencia.descripcion}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Estado</p>
              <p className="text-gray-900">{incidencia.estado}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Urgencia</p>
              <p className="text-gray-900">{incidencia.urgencia}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Categoría</p>
              <p className="text-gray-900">{incidencia.categoria}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ubicación</p>
              <p className="text-gray-900">{incidencia.ubicacion}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">Solo el creador o administrador puede editar</p>
        </div>
      )}
    </div>
  )
}
