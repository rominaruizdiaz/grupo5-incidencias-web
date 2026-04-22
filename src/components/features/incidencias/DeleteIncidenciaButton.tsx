import { useNavigate } from 'react-router-dom'
import { useDeleteIncidencia } from '@/hooks/useDeleteIncidencia'

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

    await remove(id)
    navigate('/panel')
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 text-white p-2 w-full"
    >
      Borrar incidencia
    </button>
  )
}
