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
      <div className="page-wrapper">
        <div className="page-content">
          <div className="page-warning">
            <p className="page-warning-title">
              No tienes permiso para crear incidencias.
            </p>
            <p className="page-warning-text">
              Solo administradores y profesores pueden reportar incidencias.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-card">
          <IncidenciaForm
            mode="create"
            onSubmit={form.submit}
            {...form}
            departamentos={departamentos}
          />
        </div>
      </div>
    </div>
  )
}
