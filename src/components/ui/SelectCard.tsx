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
      <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </label>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex w-full items-center justify-between
            rounded-2xl border px-4 py-3 text-left text-sm font-medium transition
            bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100
            dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800 dark:hover:bg-slate-800
          "
        >
          <div className="flex flex-1 items-center gap-3">
            {icon && <span className="flex-shrink-0 text-lg">{icon}</span>}

            <span
              className={
                selectedOption
                  ? 'font-semibold text-slate-900 dark:text-slate-100'
                  : 'text-slate-500 dark:text-slate-500'
              }
            >
              {selectedOption?.nombre || placeholder}
            </span>
          </div>

          <ChevronDown
            size={20}
            className={`
              flex-shrink-0 text-slate-500 transition
              ${isOpen ? 'rotate-180' : ''}
            `}
          />
        </button>

        {/* DROPDOWN */}
        {isOpen && (
          <div
            className="
              absolute left-0 right-0 top-full z-50 mt-2
              rounded-xl border shadow-lg
              bg-white border-slate-200
              dark:bg-slate-900 dark:border-slate-800
            "
          >
            {options.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-slate-500">
                No hay opciones disponibles
              </div>
            ) : (
              <ul className="max-h-52 overflow-y-auto">
                {options.map((option, idx) => (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(option.nombre)
                        setIsOpen(false)
                      }}
                      className={`
                        w-full px-4 py-3 text-left text-sm transition
                        ${
                          idx !== options.length - 1
                            ? 'border-b border-slate-100 dark:border-slate-800'
                            : ''
                        }
                        ${
                          selectedOption?.id === option.id
                            ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-950/40 dark:text-blue-300'
                            : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                        }
                      `}
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
