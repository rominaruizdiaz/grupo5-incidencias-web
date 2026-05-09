import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useDeleteIncidencia } from '@/hooks/incidencias/useDeleteIncidencia'

type Props = {
  id: number
}

export const DeleteIncidenciaButton = ({ id }: Props) => {
  const { remove, loading } = useDeleteIncidencia()
  const navigate = useNavigate()

  const handleDelete = async () => {
    const confirm = window.confirm(
      '¿Seguro que quieres borrar esta incidencia?'
    )
    if (!confirm) return

    const success = await remove(id)
    if (success) {
      navigate('/panel')
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white p-2 w-full rounded-lg flex items-center justify-center gap-2"
      aria-label="Borrar incidencia"
      title="Borrar incidencia"
    >
      <Trash2 size={16} />
    </button>
  )
}
