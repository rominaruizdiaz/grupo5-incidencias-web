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

    if (ok) setMensaje('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  const isDisabled = loading || disabled

  return (
    <div
      className="
      flex items-end gap-2
      p-2 rounded-xl
      border border-slate-800
      bg-slate-900
    "
    >
      {/* INPUT */}
      <textarea
        value={mensaje}
        onChange={e => setMensaje(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje..."
        disabled={isDisabled}
        rows={2}
        className="
          flex-1 resize-none
          rounded-lg px-3 py-2 text-sm
          bg-transparent
          text-slate-900 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500

          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50
        "
      />

      {/* BOTÓN */}
      <button
        type="button"
        onClick={handleEnviar}
        disabled={isDisabled || !mensaje.trim()}
        className="
          flex items-center justify-center gap-2
          rounded-lg px-4 py-2 text-sm font-semibold

          bg-blue-600 text-white
          hover:bg-blue-700 active:bg-blue-800

          disabled:opacity-50 disabled:cursor-not-allowed
          transition
        "
      >
        <Send size={16} />
        {loading ? '...' : 'Enviar'}
      </button>
    </div>
  )
}
