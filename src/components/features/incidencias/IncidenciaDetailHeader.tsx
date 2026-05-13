import { DeleteIncidenciaButton } from './DeleteIncidenciaButton'

interface Props {
  incidenciaId: number
  puedeEliminar: boolean
}

export const IncidenciaDetailHeader = ({
  incidenciaId,
  puedeEliminar,
}: Props) => {
  return (
    <div className="sticky top-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
      <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Gestión de Incidencia</h1>
      {puedeEliminar && <DeleteIncidenciaButton id={incidenciaId} />}
    </div>
  )
}
