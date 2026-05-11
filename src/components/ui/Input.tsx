import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// centralización de inputs de la app
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: React.ReactNode
  error?: string
  showPasswordToggle?: boolean
}

export const Input = ({
  label,
  icon,
  error,
  showPasswordToggle = false,
  type = 'text',
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPasswordToggle && showPassword ? 'text' : type

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={inputType}
          className={`
            w-full rounded-xl border-2 px-4 py-3 text-sm font-medium outline-none transition

            ${icon ? 'pl-12' : ''}

            ${
              error
                ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-400 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200'
                : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600 dark:hover:border-slate-700 dark:focus:bg-slate-900'
            }
          `}
          {...props}
        />

        {/* SI ES PASSWORD */}
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
