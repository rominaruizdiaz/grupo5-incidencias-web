import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { useIncidencias } from '@/hooks/useIncidencias'
import { useParams } from 'react-router-dom'
import { DeleteIncidenciaButton } from '@/components/features/incidencias/DeleteIncidenciaButton'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const { incidencias, getNombreUsuario } = useIncidencias()

  const incidencia = incidencias.find(i => i.id === Number(id))

  const form = useIncidenciaForm(incidencia)

  if (!incidencia) return <p>No encontrada</p>

  return (
    <>
      <DeleteIncidenciaButton id={incidencia.id} />
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
        reportadoPor={getNombreUsuario(incidencia.idReporta)}
        loading={form.loading}
      />
    </>
  )
}
