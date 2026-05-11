import { useParams } from 'react-router-dom'
import { useIncidencias } from '@/hooks/incidencias/useIncidencias'
import { useAsignarTecnico } from '@/hooks/incidencias/useAsignarTecnico'
import { useAutoAsignarTecnico } from '@/hooks/incidencias/useAutoAsignarTecnico'
import { useCambiarEstado } from '@/hooks/incidencias/useCambiarEstado'
import { useResolverIncidencia } from '@/hooks/incidencias/useResolverIncidencia'
import { useReabrirIncidencia } from '@/hooks/incidencias/useReabrirIncidencia'
import { useMensajes } from '@/hooks/notificaciones/useMensajes'
import { useAuthStore } from '@/store/auth.store'
import { useEnviarMensaje } from '@/hooks/incidencias/useEnviarMensaje'
import { useIncidenciaForm } from '@/hooks/incidencias/useIncidenciaForm'
import { useIncidenciaPermissions } from '@/hooks/incidencias/useIncidenciaPermissions'
import { useIncidenciaDetailData } from '@/hooks/incidencias/useIncidenciaDetailData'
import { useIncidenciaModals } from '@/hooks/incidencias/useIncidenciaModals'
import { useIncidenciaHandlers } from '@/hooks/incidencias/useIncidenciaHandlers'
import { IncidenciaEstado } from '@/types'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { IncidenciaDetailsCard } from '@/components/features/incidencias/IncidenciaDetailsCard'
import { AsignarTecnicoModal } from '@/components/features/incidencias/AsignarTecnicoModal'
import { ResolverIncidenciaModal } from '@/components/features/incidencias/ResolverIncidenciaModal'
import { ReabrirIncidenciaModal } from '@/components/features/incidencias/ReabrirIncidenciaModal'
import { CambiarEstadoModal } from '@/components/features/incidencias/CambiarEstadoModal'
import { IncidenciaDetailHeader } from '@/components/features/incidencias/IncidenciaDetailHeader'
import { IncidenciaActionButtons } from '@/components/features/incidencias/IncidenciaActionButtons'
import { IncidenciaMessagesSection } from '@/components/features/incidencias/IncidenciaMessagesSection'
import { IncidenciaNotFound } from '@/components/features/incidencias/IncidenciaNotFound'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const usuario = useAuthStore(state => state.usuario)
  const { incidencias, getNombreUsuario } = useIncidencias()
  const { asignarTecnico, loading: loadingAsignar } = useAsignarTecnico()
  const { autoAsignar, loading: loadingAutoAsignar } = useAutoAsignarTecnico()
  const { cambiarEstado, loading: loadingCambiarEstado } = useCambiarEstado()
  const { resolver, loading: loadingResolver } = useResolverIncidencia()
  const { reabrirIncidencia, loading: loadingReabrir } = useReabrirIncidencia()
  const {
    mensajes,
    loading: loadingMensajes,
    refresh: refreshMensajes,
  } = useMensajes(Number(id) || 0)
  const { enviarMensaje, loading: loadingEnviar } = useEnviarMensaje()

  // Hooks personalizados
  const modals = useIncidenciaModals()
  const incidenciaId = Number(id) || 0
  const foundIncidencia = incidencias.find(i => i.id === incidenciaId) ?? null
  const detailData = useIncidenciaDetailData(
    incidenciaId,
    foundIncidencia,
    usuario?.id,
    usuario?.rol
  )

  // Obtener la incidencia (de lista o carga directa)
  const incidencia = foundIncidencia || detailData.incidenciaDirecta

  // Calcular permisos
  const permissions = useIncidenciaPermissions(
    incidencia || null,
    usuario?.id,
    usuario?.rol,
    detailData.etiquetasUsuario,
    detailData.etiquetas
  )

  const form = useIncidenciaForm(incidencia)

  // Handlers centralizados
  const handlers = useIncidenciaHandlers({
    incidencia,
    usuario,
    modals,
    detailData,
    form,
    asignarTecnico,
    cambiarEstado,
    resolver,
    reabrirIncidencia,
    enviarMensaje,
    refreshMensajes,
  })

  if (!incidencia) {
    return <IncidenciaNotFound incidenciaId={id} />
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <IncidenciaDetailHeader
        incidenciaId={incidencia.id}
        puedeEliminar={permissions.puedeEliminar}
      />

      <div className="px-6 py-6 max-w-4xl mx-auto space-y-6 dark">
        <IncidenciaActionButtons
          puedeAsignar={permissions.puedeAsignar}
          puedeSelfAsignar={permissions.puedeSelfAsignar}
          puedeReabrir={
            permissions.esCreador ||
            permissions.esAsignado ||
            permissions.esAdmin
          }
          estado={incidencia.estado}
          esCreador={permissions.esCreador}
          esAsignado={permissions.esAsignado}
          esAdmin={permissions.esAdmin}
          loadingAsignar={loadingAsignar || loadingAutoAsignar}
          loadingReabrir={loadingReabrir}
          onAsignar={handlers.handleAbrirAsignar}
          onSelfAsignar={async () => {
            if (incidencia) {
              const exito = await autoAsignar(incidencia.id)
              if (exito) {
                setTimeout(() => window.location.reload(), 1000)
              }
            }
          }}
          onReabrir={() => modals.openReabrirModal()}
        />

        {permissions.puedeEditarTextos ? (
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
            onSelectResolved={() => modals.openResolverModal()}
            fecha={incidencia.fecha}
            reportadoPor={getNombreUsuario(incidencia.idUsuarioReporta)}
            loading={form.loading}
            departamentos={detailData.departamentos}
          />
        ) : (
          <IncidenciaDetailsCard
            incidencia={incidencia}
            reportadoPor={getNombreUsuario(incidencia.idUsuarioReporta)}
            asignadoA={
              incidencia.idUsuarioAsignado
                ? getNombreUsuario(incidencia.idUsuarioAsignado)
                : undefined
            }
            puedeCambiarEstado={permissions.puedeCambiarEstado}
            onCambiarEstado={
              permissions.puedeCambiarEstado
                ? (estado) => handlers.handleCambiarEstado(estado)
                : undefined
            }
            onSelectResolved={() => modals.openResolverModal()}
          />
        )}

        {permissions.tieneAccesoAlChat && (
          <IncidenciaMessagesSection
            mensajes={mensajes}
            getNombreUsuario={getNombreUsuario}
            usuarioActualId={usuario?.id}
            loading={loadingMensajes}
            loadingEnviar={loadingEnviar}
            onEnviarMensaje={handlers.handleEnviarMensaje}
          />
        )}
      </div>

      <AsignarTecnicoModal
        isOpen={modals.isModalAsignarOpen}
        onClose={modals.closeAsignarModal}
        onAsignar={handlers.handleAsignarTecnico}
        categoria={incidencia?.categoria}
        etiquetaActual={detailData.etiquetaActual}
        loading={loadingAsignar}
      />

      <ResolverIncidenciaModal
        isOpen={modals.isModalResolverOpen}
        onClose={modals.closeResolverModal}
        onResolver={handlers.handleResolverIncidencia}
        loading={loadingResolver}
        tituloIncidencia={incidencia?.titulo}
      />

      <ReabrirIncidenciaModal
        isOpen={modals.isModalReabrirOpen}
        onClose={modals.closeReabrirModal}
        onReabrir={handlers.handleReabrirIncidencia}
        loading={loadingReabrir}
        tituloIncidencia={incidencia?.titulo}
      />

      <CambiarEstadoModal
        isOpen={modals.isModalCambiarEstadoOpen}
        onClose={modals.closeCambiarEstadoModal}
        onCambiar={handlers.handleCambiarEstado}
        loading={loadingCambiarEstado}
        estadoActual={incidencia?.estado}
      />
    </div>
  )
}
