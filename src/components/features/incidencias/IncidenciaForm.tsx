import type { IncidenciaUrgencia } from '@/types'

type Props = {
  mode: 'create' | 'edit'
  loading: boolean
  onSubmit: (e: React.FormEvent) => void

  titulo: string
  setTitulo: (v: string) => void
  descripcion: string
  setDescripcion: (v: string) => void
  categoria: string
  setCategoria: (v: string) => void
  ubicacion: string
  setUbicacion: (v: string) => void
  urgencia: IncidenciaUrgencia
  setUrgencia: (v: IncidenciaUrgencia) => void
}

export const IncidenciaForm = (props: Props) => {
  return (
    <form onSubmit={props.onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {props.mode === 'create' ? 'Nueva incidencia' : 'Editar incidencia'}
      </h2>

      <input
        value={props.titulo}
        onChange={e => props.setTitulo(e.target.value)}
      />

      <select
        value={props.ubicacion}
        onChange={e => props.setUbicacion(e.target.value)}
      />

      <select
        value={props.categoria}
        onChange={e => props.setCategoria(e.target.value)}
      />

      <select
        value={props.urgencia}
        onChange={e => props.setUrgencia(e.target.value as IncidenciaUrgencia)}
      />

      <textarea
        value={props.descripcion}
        onChange={e => props.setDescripcion(e.target.value)}
      />

      <button disabled={props.loading}>
        {props.mode === 'create' ? 'Crear' : 'Guardar cambios'}
      </button>
    </form>
  )
}
