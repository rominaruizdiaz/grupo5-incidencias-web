import { useState } from 'react'
import { Send } from 'lucide-react'

interface NuevoMensajeInputProps {
  onEnviar: (mensaje: string) => Promise<void>
  loading?: boolean
  disabled?: boolean
}

export const NuevoMensajeInput = ({
  onEnviar,
  loading,
  disabled,
}: NuevoMensajeInputProps) => {
  const [mensaje, setMensaje] = useState('')

  const handleEnviar = async () => {
    if (!mensaje.trim()) return
    await onEnviar(mensaje)
    setMensaje('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleEnviar()
    }
  }

  return (
    <div className="flex gap-2 items-end">
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe una actualización... (Ctrl+Enter para enviar)"
        disabled={loading || disabled}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        rows={3}
      />
      <button
        onClick={handleEnviar}
        disabled={loading || disabled || !mensaje.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
      >
        <Send size={18} />
        Enviar
      </button>
    </div>
  )
}
