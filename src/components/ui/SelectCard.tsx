import { ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

// selector dropdown personalizado
type Props = {
  label: string
  value: string | null
  placeholder: string
  options: { id: string | number; nombre: string }[]
  onChange: (value: string) => void
  icon?: React.ReactNode
}

export const SelectCard = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  icon,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  // detecta si el click fue fuera
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // encuentra el objeto seleccionado
  const selectedOption = options.find(opt => opt.nombre === value)

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </label>

      {/* FLECHA ANIMADA */}
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 transition flex items-center justify-between"
        >
          <div className="flex items-center gap-3 flex-1">
            {icon && <span className="text-lg flex-shrink-0">{icon}</span>}
            <span
              className={
                selectedOption ? 'text-gray-900 font-semibold' : 'text-gray-500'
              }
            >
              {selectedOption?.nombre || placeholder}
            </span>
          </div>

          <ChevronDown
            size={20}
            className={`flex-shrink-0 text-gray-600 transition ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg">
            {options.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No hay opciones disponibles
              </div>
            ) : (
              <ul className="max-h-48 overflow-y-auto">
                {options.map((option, idx) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.nombre)
                        setIsOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition ${
                        idx !== options.length - 1
                          ? 'border-b border-gray-100'
                          : ''
                      } ${
                        selectedOption?.id === option.id
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
