import { useEffect, useState } from 'react'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { useIncidenciaForm } from '@/hooks/useIncidenciaForm'
import { getDepartamentos } from '@/services/departamentos'
import type { Departamento } from '@/types'

export const CreateIncidenciaPage = () => {
  const form = useIncidenciaForm()
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])

  useEffect(() => {
    getDepartamentos().then(setDepartamentos)
  }, [])

  return (
    <IncidenciaForm
      mode="create"
      onSubmit={form.submit}
      {...form}
      departamentos={departamentos}
    />
  )
}
