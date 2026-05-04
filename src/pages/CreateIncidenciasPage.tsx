import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { getDepartamentos } from '@/services/departamentos'
import type { Departamento } from '@/types'
import { useIncidenciaForm } from '@/hooks/incidencias/useIncidenciaForm'

export const CreateIncidenciaPage = () => {
  const usuario = useAuthStore(state => state.usuario)
  const form = useIncidenciaForm()
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])

  useEffect(() => {
    getDepartamentos().then(setDepartamentos)
  }, [])

  // Técnicos (Rol 3) no pueden crear incidencias
  if (usuario?.rol === 3) {
    return (
      <div className="p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 inline-block">
          <p className="text-yellow-900 font-semibold">
            No tienes permiso para crear incidencias.
          </p>
          <p className="text-yellow-700 text-sm mt-2">
            Solo administradores y profesores pueden reportar incidencias.
          </p>
        </div>
      </div>
    )
  }

  return (
    <IncidenciaForm
      mode="create"
      onSubmit={form.submit}
      {...form}
      departamentos={departamentos}
    />
  )
}
