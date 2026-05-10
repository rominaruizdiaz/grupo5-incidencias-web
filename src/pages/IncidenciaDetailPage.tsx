import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { IncidenciaDetailsCard } from '@/components/features/incidencias/IncidenciaDetailsCard'
import { AsignarTecnicoModal } from '@/components/features/incidencias/AsignarTecnicoModal'
import { ResolverIncidenciaModal } from '@/components/features/incidencias/ResolverIncidenciaModal'
import { ReabrirIncidenciaModal } from '@/components/features/incidencias/ReabrirIncidenciaModal'
import { MensajesList } from '@/components/features/incidencias/MensajesList'
import { NuevoMensajeInput } from '@/components/features/incidencias/NuevoMensajeInput'
import { useIncidencias } from '@/hooks/incidencias/useIncidencias'
import { useAsignarTecnico } from '@/hooks/incidencias/useAsignarTecnico'
import { useResolverIncidencia } from '@/hooks/incidencias/useResolverIncidencia'
import { useReabrirIncidencia } from '@/hooks/incidencias/useReabrirIncidencia'
import { useMensajes } from '@/hooks/notificaciones/useMensajes'
import { useAuthStore } from '@/store/auth.store'
import { useParams } from 'react-router-dom'
import { DeleteIncidenciaButton } from '@/components/features/incidencias/DeleteIncidenciaButton'
import { getEtiquetas } from '@/services/etiquetas'
import { getDepartamentos } from '@/services/departamentos'
import { getIncidenciaById } from '@/services/incidencias'
import { getEtiquetasPorUsuario } from '@/services/usuarioEtiquetas'
import { type Departamento, type Incidencia, IncidenciaEstado } from '@/types'
import {
  ArrowLeft,
  Trash2,
  UserPlus,
  CheckCircle,
  RefreshCw,
} from 'lucide-react'
import { useEnviarMensaje } from '@/hooks/incidencias/useEnviarMensaje'
import { useIncidenciaForm } from '@/hooks/incidencias/useIncidenciaForm'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const usuario = useAuthStore(state => state.usuario)
  const { incidencias, getNombreUsuario } = useIncidencias()
  const { asignarTecnico, loading: loadingAsignar } = useAsignarTecnico()
  const { resolverIncidencia, loading: loadingResolver } =
    useResolverIncidencia()
  const { reabrirIncidencia, loading: loadingReabrir } = useReabrirIncidencia()
  const {
    mensajes,
    loading: loadingMensajes,
    refresh: refreshMensajes,
  } = useMensajes(Number(id) || 0)
  const { enviarMensaje, loading: loadingEnviar } = useEnviarMensaje()

  const [isModalAsignarOpen, setIsModalAsignarOpen] = useState(false)
  const [isModalResolverOpen, setIsModalResolverOpen] = useState(false)
  const [isModalReabrirOpen, setIsModalReabrirOpen] = useState(false)
  const [etiquetaActual, setEtiquetaActual] = useState<any>(null)
  const [incidenciaDirecta, setIncidenciaDirecta] = useState<Incidencia | null>(
    null
  )
  const [etiquetasUsuario, setEtiquetasUsuario] = useState<number[]>([])
  const [etiquetas, setEtiquetas] = useState<any[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])

  let incidencia = incidencias.find(i => i.id === Number(id))
  if (!incidencia && incidenciaDirecta) {
    incidencia = incidenciaDirecta
  }

  useEffect(() => {
    const incidenciaEnLista = incidencias.find(i => i.id === Number(id))

    if (!incidenciaEnLista && id) {
      const fetchIncidencia = async () => {
        try {
          const data = await getIncidenciaById(Number(id))
          if (data) {
            setIncidenciaDirecta(data)
          }
        } catch (err) {
          console.error('Error cargando incidencia:', err)
        }
      }
      fetchIncidencia()
    }
  }, [id, incidencias])

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

        // Cargar todas las áreas para el formulario de edición
        const departamentosData = await getDepartamentos()
        setDepartamentos(departamentosData)
      } catch (err) {
        console.error('Error cargando datos:', err)
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
        const encontrada = etiquetas.find(
          e => e.nombre === incidencia.categoria
        )
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

  const handleAsignarTecnico = async (
    idTecnico: number,
    nombreTecnico: string
  ) => {
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

  const handleEnviarMensaje = async (mensaje: string): Promise<boolean> => {
    if (!usuario || !incidencia) return false

    const exito = await enviarMensaje(incidencia, usuario.id, mensaje)

    if (exito) {
      await refreshMensajes()
    }

    return exito
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
    const navigate = useNavigate()
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          {/* svg de listar */}
          <div className="text-5xl mb-4"></div>
          <p className="text-gray-900 text-lg font-semibold mb-2">
            Incidencia no encontrada
          </p>
          <p className="text-gray-600 text-sm mb-6">
            No pudimos encontrar la incidencia #{id}
          </p>
          <button
            onClick={() => navigate('/panel')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Volver al Panel
          </button>
        </div>
      </div>
    )
  }

  const navigate = useNavigate()

  // Calcular permisos
  const esCreador = usuario?.id === incidencia.idUsuarioReporta
  const esAdmin = usuario?.rol === 1
  const esTecnico = usuario?.rol === 3
  const esAsignado = usuario?.id === incidencia.idUsuarioAsignado

  // Calcular si el técnico tiene la especialización necesaria
  const tieneespecializacion = (() => {
    if (!esTecnico || !incidencia.categoria) return false
    const etiquetaCategoria = etiquetas.find(
      e => e.nombre === incidencia.categoria
    )
    return etiquetaCategoria
      ? etiquetasUsuario.includes(etiquetaCategoria.id)
      : false
  })()

  // Permisos de edición
  const puedeEditarTextos =
    (esCreador || esAdmin) && incidencia.estado !== 'Resuelto'
  const puedeCambiarEstado =
    (esAdmin || (esTecnico && esAsignado)) && incidencia.estado !== 'Resuelto'
  const puedeAsignar = esAdmin
  const puedeResolver =
    incidencia.estado !== 'Resuelto' &&
    (esAdmin ||
      (esTecnico &&
        (esAsignado ||
          (!incidencia.idUsuarioAsignado && tieneespecializacion))))
  const puedeEliminar =
    (esCreador && incidencia.estado !== 'Resuelto') || esAdmin

  const tieneAccesoAlChat =
    puedeEditarTextos || puedeCambiarEstado || puedeAsignar

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">
          Gestión de Incidencia
        </h1>
        {puedeEliminar && <DeleteIncidenciaButton id={incidencia.id} />}
      </div>

      <div className="px-6 py-6 max-w-4xl mx-auto space-y-6">
        {/* BOTONES */}
        {(puedeAsignar ||
          puedeResolver ||
          (incidencia.estado === 'Resuelto' &&
            (esCreador || esAsignado || esAdmin))) && (
          <div className="flex flex-wrap gap-3">
            {puedeAsignar && incidencia.estado !== 'Resuelto' && (
              <button
                onClick={handleAbrirAsignar}
                disabled={loadingAsignar}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
              >
                <UserPlus size={18} />
                Asignar Técnico
              </button>
            )}

            {puedeResolver && (
              <button
                onClick={handleAbrirResolver}
                disabled={loadingResolver}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-medium"
              >
                <CheckCircle size={18} />
                Marcar Resuelto
              </button>
            )}

            {incidencia.estado === 'Resuelto' &&
              (esCreador || esAsignado || esAdmin) && (
                <button
                  onClick={handleAbrirReabrir}
                  disabled={loadingReabrir}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 font-medium"
                >
                  <RefreshCw size={18} />
                  Reabrir
                </button>
              )}
          </div>
        )}

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
            departamentos={departamentos}
          />
        ) : puedeCambiarEstado && !puedeEditarTextos ? (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              {incidencia.idUsuarioAsignado && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-900">
                    <strong>Asignado a:</strong>{' '}
                    {getNombreUsuario(incidencia.idUsuarioAsignado)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-600">Título</p>
                <p className="text-lg font-semibold text-gray-900">
                  {incidencia.titulo}
                </p>
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
            </div>

            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Cambiar Estado
              </h3>
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
          <>
            <IncidenciaDetailsCard
              incidencia={incidencia}
              reportadoPor={getNombreUsuario(incidencia.idUsuarioReporta)}
              asignadoA={
                incidencia.idUsuarioAsignado
                  ? getNombreUsuario(incidencia.idUsuarioAsignado)
                  : undefined
              }
            />
            <p className="text-xs text-gray-500 text-center">
              Solo el creador o administrador puede editar
            </p>
          </>
        )}

        {tieneAccesoAlChat && (
          <div className="mt-8 flex flex-col h-[60vh] md:h-[65vh] border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Registro de Seguimiento
            </h3>

            <div className="flex-1 min-h-0 overflow-hidden">
              <MensajesList
                mensajes={mensajes}
                getNombreUsuario={getNombreUsuario}
                usuarioActualId={usuario?.id}
                loading={loadingMensajes}
              />
            </div>

            <div className="pt-3 bg-white">
              <NuevoMensajeInput
                onEnviar={handleEnviarMensaje}
                loading={loadingEnviar}
                disabled={false}
              />
            </div>
          </div>
        )}
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

      {/* Modal para reabrir incidencia */}
      <ReabrirIncidenciaModal
        isOpen={isModalReabrirOpen}
        onClose={() => setIsModalReabrirOpen(false)}
        onReabrir={handleReabrirIncidencia}
        loading={loadingReabrir}
        tituloIncidencia={incidencia?.titulo}
      />
    </div>
  )
}
