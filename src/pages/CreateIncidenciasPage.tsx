import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'

export const CreateIncidenciaPage = () => {
  const form = useIncidenciaForm()

  return <IncidenciaForm mode="create" onSubmit={form.submit} {...form} />
}
