type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = ({ label, error, className, ...props }: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
        </label>
      )}

      <textarea
        className={`
          w-full rounded-xl border-2 px-4 py-3 text-sm font-medium outline-none transition resize-none
          ${
            error
              ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-400'
              : 'border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-500 hover:border-gray-300 focus:border-blue-500 focus:bg-white'
          }
          ${className}
        `}
        {...props}
      />

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
