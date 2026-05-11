// diseño del textarea reutilizable de la app con label y error

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export const Textarea = ({ label, error, className, ...props }: Props) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
          {label}
        </label>
      )}

      <textarea
        className={`
          w-full rounded-xl border-2 px-4 py-3 text-sm font-medium outline-none transition resize-none

          ${
            error
              ? 'border-red-300 bg-red-50 text-red-900 placeholder:text-red-400 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200'
              : 'border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600 dark:hover:border-slate-700 dark:focus:bg-slate-900'
          }

          ${className || ''}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
