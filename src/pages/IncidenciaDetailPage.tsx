import { useState } from 'react'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { AsignarTecnicoModal } from '@/components/features/incidencias/AsignarTecnicoModal'
import { ResolverIncidenciaModal } from '@/components/features/incidencias/ResolverIncidenciaModal'
import { MensajesList } from '@/components/features/incidencias/MensajesList'
import { NuevoMensajeInput } from '@/components/features/incidencias/NuevoMensajeInput'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { useIncidencias } from '@/hooks/useIncidencias'
import { useAsignarTecnico } from '@/hooks/useAsignarTecnico'
import { useResolverIncidencia } from '@/hooks/useResolverIncidencia'
import { useMensajes } from '@/hooks/useMensajes'
import { useEnviarMensaje } from '@/hooks/useEnviarMensaje'
import { useAuthStore } from '@/store/auth.store'
import { useParams } from 'react-router-dom'
import { DeleteIncidenciaButton } from '@/components/features/incidencias/DeleteIncidenciaButton'
import { getEtiquetas } from '@/services/etiquetas'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const usuario = useAuthStore(state => state.usuario)
  const { incidencias, getNombreUsuario } = useIncidencias()
  const { asignarTecnico, loading: loadingAsignar } = useAsignarTecnico()
  const { resolverIncidencia, loading: loadingResolver } = useResolverIncidencia()
  const { mensajes, loading: loadingMensajes, refresh: refreshMensajes } = useMensajes(Number(id) || 0)
  const { enviarMensaje, loading: loadingEnviar } = useEnviarMensaje()

  const [isModalAsignarOpen, setIsModalAsignarOpen] = useState(false)
  const [isModalResolverOpen, setIsModalResolverOpen] = useState(false)
  const [etiquetaActual, setEtiquetaActual] = useState<any>(null)

  const incidencia = incidencias.find(i => i.id === Number(id))

  const form = useIncidenciaForm(incidencia)

  // Obtener etiqueta actual basada en la categoría
  const loadEtiquetaActual = async () => {
    if (incidencia?.categoria) {
      try {
        const etiquetas = await getEtiquetas()
        const encontrada = etiquetas.find(e => e.nombre === incidencia.categoria)
        setEtiquetaActual(encontrada || null)
      } catch (err) {
        console.error('Error cargando etiqueta:', err)
      }
    }
  }

  const handleAbrirAsignar = async () => {
    await loadEtiquetaActual()
    setIsModalAsignarOpen(true)
  }

  const handleAsignarTecnico = async (idTecnico: number, nombreTecnico: string) => {
    if (!incidencia) return
    const exito = await asignarTecnico(
      incidencia.id,
      idTecnico,
      nombreTecnico,
      incidencia.titulo
    )
    if (exito) {
      setIsModalAsignarOpen(false)
      // Refresh incidencias
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const handleAbrirResolver = () => {
    setIsModalResolverOpen(true)
  }

  const handleResolverIncidencia = async (descripcionResolucion?: string) => {
    if (!incidencia || !incidencia.idUsuarioReporta) return
    const exito = await resolverIncidencia(
      incidencia.id,
      incidencia.idUsuarioReporta,
      incidencia.titulo,
      descripcionResolucion
    )
    if (exito) {
      setIsModalResolverOpen(false)
      // Refresh incidencias
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const handleEnviarMensaje = async (mensaje: string) => {
    if (!usuario || !incidencia) return
    const exito = await enviarMensaje(incidencia.id, usuario.id, mensaje)
    if (exito) {
      await refreshMensajes()
    }
  }

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
          <button
            onClick={handleAbrirAsignar}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loadingAsignar}
          >
            Asignar Técnico
          </button>
        )}

        {puedeResolverEnumerations && incidencia.estado !== 'Resuelto' && (
          <button
            onClick={handleAbrirResolver}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            disabled={loadingResolver}
          >
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
          {incidencia.idUsuarioAsignado && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-900">
                <strong>Asignado a:</strong> {getNombreUsuario(incidencia.idUsuarioAsignado)}
              </p>
            </div>
          )}
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

      {/* Sección de mensajes */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Registro de Seguimiento
          </h3>
          <div className="bg-white rounded-lg border border-gray-200 p-6 max-h-96 overflow-y-auto mb-4">
            <MensajesList
              mensajes={mensajes}
              getNombreUsuario={getNombreUsuario}
              usuarioActualId={usuario?.id}
              loading={loadingMensajes}
            />
          </div>
        </div>

        <NuevoMensajeInput
          onEnviar={handleEnviarMensaje}
          loading={loadingEnviar}
          disabled={false}
        />
      </div>

      {/* Modal para asignar técnico */}
      <AsignarTecnicoModal
        isOpen={isModalAsignarOpen}
        onClose={() => setIsModalAsignarOpen(false)}
        onAsignar={handleAsignarTecnico}
        categoria={incidencia?.categoria}
        etiquetaActual={etiquetaActual}
        loading={loadingAsignar}
      />

      {/* Modal para resolver incidencia */}
      <ResolverIncidenciaModal
        isOpen={isModalResolverOpen}
        onClose={() => setIsModalResolverOpen(false)}
        onResolver={handleResolverIncidencia}
        loading={loadingResolver}
        tituloIncidencia={incidencia?.titulo}
      />
    </div>
  )
}
