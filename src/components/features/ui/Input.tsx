import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

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
        <label className="block text-sm font-semibold text-gray-900">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
            {icon}
          </div>
        )}

        <input
          type={inputType}
          className={`w-full rounded-xl border-2 px-4 py-3 text-sm font-medium outline-none transition ${
            icon ? 'pl-12' : ''
          } ${
            error
              ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-400'
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-500 hover:border-gray-300 focus:border-blue-500 focus:bg-white'
          }`}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
