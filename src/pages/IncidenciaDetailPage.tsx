import '../styles/IncidenciaDetailPage.css'
import { useState, useEffect } from 'react'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { AsignarTecnicoModal } from '@/components/features/incidencias/AsignarTecnicoModal'
import { ResolverIncidenciaModal } from '@/components/features/incidencias/ResolverIncidenciaModal'
import { ReabrirIncidenciaModal } from '@/components/features/incidencias/ReabrirIncidenciaModal'
import { MensajesList } from '@/components/features/incidencias/MensajesList'
import { NuevoMensajeInput } from '@/components/features/incidencias/NuevoMensajeInput'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { useIncidencias } from '@/hooks/useIncidencias'
import { useAsignarTecnico } from '@/hooks/useAsignarTecnico'
import { useResolverIncidencia } from '@/hooks/useResolverIncidencia'
import { useReabrirIncidencia } from '@/hooks/useReabrirIncidencia'
import { useMensajes } from '@/hooks/useMensajes'
import { useEnviarMensaje } from '@/hooks/useEnviarMensaje'
import { useAuthStore } from '@/store/auth.store'
import { useParams } from 'react-router-dom'
import { DeleteIncidenciaButton } from '@/components/features/incidencias/DeleteIncidenciaButton'
import { getEtiquetas } from '@/services/etiquetas'
import { getIncidenciaById } from '@/services/incidencias'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'
import { type Incidencia, IncidenciaEstado } from '@/types'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const usuario = useAuthStore(state => state.usuario)
  const { incidencias, getNombreUsuario } = useIncidencias()
  const { asignarTecnico, loading: loadingAsignar } = useAsignarTecnico()
  const { resolverIncidencia, loading: loadingResolver } = useResolverIncidencia()
  const { reabrirIncidencia, loading: loadingReabrir } = useReabrirIncidencia()
  const { mensajes, loading: loadingMensajes, refresh: refreshMensajes } = useMensajes(Number(id) || 0)
  const { enviarMensaje, loading: loadingEnviar } = useEnviarMensaje()

  const [isModalAsignarOpen, setIsModalAsignarOpen] = useState(false)
  const [isModalResolverOpen, setIsModalResolverOpen] = useState(false)
  const [isModalReabrirOpen, setIsModalReabrirOpen] = useState(false)
  const [etiquetaActual, setEtiquetaActual] = useState<any>(null)
  const [incidenciaDirecta, setIncidenciaDirecta] = useState<Incidencia | null>(null)
  const [etiquetasUsuario, setEtiquetasUsuario] = useState<number[]>([])
  const [etiquetas, setEtiquetas] = useState<any[]>([])

  let incidencia = incidencias.find(i => i.id === Number(id))
  if (!incidencia && incidenciaDirecta) {
    incidencia = incidenciaDirecta
  }

  useEffect(() => {
    if (!incidencia && id) {
      const fetchIncidencia = async () => {
        try {
          const data = await getIncidenciaById(Number(id))
          setIncidenciaDirecta(data)
        } catch (err) {
          console.error('Error cargando incidencia:', err)
        }
      }
      fetchIncidencia()
    }
  }, [id, incidencia])

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Cargar etiquetas globales
        const etiquetasData = await getEtiquetas()
        setEtiquetas(etiquetasData)

        // Cargar etiquetas del usuario técnico actual si es técnico
        if (usuario && usuario.rol === 3) {
          const etiquetasDelUsuario = await getEtiquetasPorUsuario(usuario.id)
          setEtiquetasUsuario(etiquetasDelUsuario)
        }
      } catch (err) {
        console.error('Error cargando etiquetas:', err)
      }
    }
    cargarDatos()
  }, [usuario])

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

  const handleAbrirReabrir = () => {
    setIsModalReabrirOpen(true)
  }

  const handleReabrirIncidencia = async (nuevoEstado: IncidenciaEstado) => {
    if (!incidencia) return
    const exito = await reabrirIncidencia(
      incidencia.id,
      incidencia.idUsuarioAsignado ?? undefined,
      incidencia.titulo,
      nuevoEstado
    )
    if (exito) {
      setIsModalReabrirOpen(false)
      // Refresh incidencias
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  if (!incidencia) {
    return (
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-card text-center text-slate-400">
            No encontrada
          </div>
        </div>
      </div>
    )
  }

  // Calcular permisos
  const esCreador = usuario?.id === incidencia.idUsuarioReporta
  const esAdmin = usuario?.rol === 1
  const esTecnico = usuario?.rol === 3
  const esAsignado = usuario?.id === incidencia.idUsuarioAsignado

  // Calcular si el técnico tiene la especialización necesaria
  const tieneespecializacion = (() => {
    if (!esTecnico || !incidencia.categoria) return false
    const etiquetaCategoria = etiquetas.find(e => e.nombre === incidencia.categoria)
    return etiquetaCategoria ? etiquetasUsuario.includes(etiquetaCategoria.id) : false
  })()

  // Permisos de edición
  const puedeEditarTextos = (esCreador || esAdmin) && incidencia.estado !== 'Resuelto'
  const puedeCambiarEstado = (esAdmin || (esTecnico && esAsignado)) && incidencia.estado !== 'Resuelto'
  const puedeAsignar = esAdmin
  const puedeResolver = esAdmin || (esTecnico && (esAsignado || (!incidencia.idUsuarioAsignado && tieneespecializacion))) && incidencia.estado !== 'Resuelto'
  const puedeEliminar = (esCreador && incidencia.estado !== 'Resuelto') || esAdmin

  const tieneAccesoAlChat = puedeEditarTextos || puedeCambiarEstado || puedeAsignar

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-card space-y-4">
          <div className="page-header-actions">
        {puedeEliminar && <DeleteIncidenciaButton id={incidencia.id} />}

        {puedeAsignar && incidencia.estado !== 'Resuelto' && (
          <button
            onClick={handleAbrirAsignar}
            className="page-button-primary"
            disabled={loadingAsignar}
          >
            Asignar Técnico
          </button>
        )}

        {puedeResolver && (
          <button
            onClick={handleAbrirResolver}
            className="page-button-success"
            disabled={loadingResolver}
          >
            Marcar como Resuelto
          </button>
        )}

        {incidencia.estado === 'Resuelto' && (esCreador || esAsignado || esAdmin) && (
          <button
            onClick={handleAbrirReabrir}
            className="page-button-warning"
            disabled={loadingReabrir}
          >
            Reabrir Incidencia
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
          estado={form.estado}
          setEstado={form.setEstado}
          fecha={incidencia.fecha}
          reportadoPor={getNombreUsuario(incidencia.idUsuarioReporta)}
          loading={form.loading}
        />
      ) : puedeCambiarEstado && !puedeEditarTextos ? (
        <div className="space-y-6">
          <div className="page-card space-y-4">
            {incidencia.idUsuarioAsignado && (
              <div className="page-message-success">
                <p className="text-sm text-green-900">
                  <strong>Asignado a:</strong> {getNombreUsuario(incidencia.idUsuarioAsignado)}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-slate-400">Título</p>
              <p className="text-lg font-semibold text-white">{incidencia.titulo}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Descripción</p>
              <p className="text-slate-200">{incidencia.descripcion}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">Estado</p>
                <p className="text-slate-200">{incidencia.estado}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Urgencia</p>
                <p className="text-slate-200">{incidencia.urgencia}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Categoría</p>
                <p className="text-slate-200">{incidencia.categoria}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Ubicación</p>
                <p className="text-slate-200">{incidencia.ubicacion}</p>
              </div>
            </div>
          </div>

          <div className="page-card space-y-4">
            <h3 className="text-lg font-semibold text-white">Cambiar Estado</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  form.setEstado(IncidenciaEstado.ACTIVO)
                  form.submit({
                    preventDefault: () => {},
                  } as React.FormEvent)
                }}
                className={`px-4 py-2 rounded text-white transition ${
                  incidencia.estado === IncidenciaEstado.ACTIVO
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              >
                Activo
              </button>
              <button
                onClick={() => {
                  form.setEstado(IncidenciaEstado.EN_CURSO)
                  form.submit({
                    preventDefault: () => {},
                  } as React.FormEvent)
                }}
                className={`px-4 py-2 rounded text-white transition ${
                  incidencia.estado === IncidenciaEstado.EN_CURSO
                    ? 'bg-yellow-600 hover:bg-yellow-700'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              >
                En Curso
              </button>
              <button
                onClick={() => {
                  form.setEstado(IncidenciaEstado.RESUELTO)
                  form.submit({
                    preventDefault: () => {},
                  } as React.FormEvent)
                }}
                className={`px-4 py-2 rounded text-white transition ${
                  incidencia.estado === IncidenciaEstado.RESUELTO
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              >
                Resuelto
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="page-card space-y-4">
          {incidencia.idUsuarioAsignado && (
            <div className="page-message-resolved">
              <p className="text-sm text-emerald-200">
                <strong>Asignado a:</strong> {getNombreUsuario(incidencia.idUsuarioAsignado)}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-slate-400">Título</p>
            <p className="text-lg font-semibold text-white">{incidencia.titulo}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Descripción</p>
            <p className="text-slate-200">{incidencia.descripcion}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-400">Estado</p>
              <p className="text-slate-200">{incidencia.estado}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Urgencia</p>
              <p className="text-slate-200">{incidencia.urgencia}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Categoría</p>
              <p className="text-slate-200">{incidencia.categoria}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Ubicación</p>
              <p className="text-slate-200">{incidencia.ubicacion}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">Solo el creador o administrador puede editar</p>
        </div>
      )}

      {/* Sección de mensajes - solo visible si tiene acceso */}
      {tieneAccesoAlChat && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Registro de Seguimiento
            </h3>
            <div className="page-card border border-slate-800 p-6 max-h-96 overflow-y-auto mb-4">
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
      )}

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

      {/* Modal para reabrir incidencia */}
      <ReabrirIncidenciaModal
        isOpen={isModalReabrirOpen}
        onClose={() => setIsModalReabrirOpen(false)}
        onReabrir={handleReabrirIncidencia}
        loading={loadingReabrir}
        tituloIncidencia={incidencia?.titulo}
      />
        </div>
      </div>    </div>
  )
}
