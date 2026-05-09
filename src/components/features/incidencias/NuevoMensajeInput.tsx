import { useState } from 'react'
import { Send } from 'lucide-react'

interface Props {
  onEnviar: (mensaje: string) => Promise<boolean>
  loading?: boolean
  disabled?: boolean
}

export const NuevoMensajeInput = ({ onEnviar, loading, disabled }: Props) => {
  const [mensaje, setMensaje] = useState('')

  const handleEnviar = async () => {
    const texto = mensaje.trim()
    if (!texto) return

    const ok = await onEnviar(texto)

    if (ok) {
      setMensaje('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  return (
    <div className="flex items-end gap-2">
      <textarea
        value={mensaje}
        onChange={e => setMensaje(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        disabled={loading || disabled}
        rows={2}
        className="flex-1 resize-none rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={handleEnviar}
        disabled={loading || disabled || !mensaje.trim()}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        <Send size={16} />
        {loading ? '...' : 'Enviar'}
      </button>
    </div>
  )
}
