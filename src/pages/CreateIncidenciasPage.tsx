import { useCallback, useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { IncidenciaForm } from '@/components/features/incidencias/IncidenciaForm'
import { getDepartamentos } from '@/services/departamentos'
import type { Departamento } from '@/types'
import { useIncidenciaForm } from '@/hooks/incidencias/useIncidenciaForm'

export const CreateIncidenciaPage = () => {
  const usuario = useAuthStore(state => state.usuario)
  const form = useIncidenciaForm()
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])

  const fetchDepartamentos = useCallback(async () => {
    const data = await getDepartamentos()
    setDepartamentos(data)
  }, [])

  useEffect(() => {
    fetchDepartamentos()
  }, [fetchDepartamentos])

  useEffect(() => {
    const handleDepartamentosUpdated = () => fetchDepartamentos()

    window.addEventListener('departamentosUpdated', handleDepartamentosUpdated)
    return () =>
      window.removeEventListener(
        'departamentosUpdated',
        handleDepartamentosUpdated
      )
  }, [fetchDepartamentos])

  // Técnicos (Rol 3) no pueden crear incidencias
  if (usuario?.rol === 3) {
    return (
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/40">
          <p className="font-bold text-red-700 dark:text-red-300">
            No tienes permiso para crear incidencias.
          </p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            Solo administradores y profesores pueden reportar incidencias.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="w-full">
        <IncidenciaForm
          mode="create"
          onSubmit={form.submit}
          {...form}
          departamentos={departamentos}
        />
      </div>
    </div>
  )
}
