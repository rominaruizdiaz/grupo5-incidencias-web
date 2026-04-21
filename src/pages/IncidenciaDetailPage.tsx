import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { useIncidencias } from '@/hooks/useIncidencias'
import { useParams } from 'react-router-dom'

export const IncidenciaDetailPage = () => {
  const { id } = useParams()
  const { incidencias } = useIncidencias()

  const incidencia = incidencias.find(i => i.id === Number(id))

  const form = useIncidenciaForm(incidencia)

  if (!incidencia) return <p>No encontrada</p>

  return <IncidenciaForm mode="edit" onSubmit={form.submit} {...form} />
}
