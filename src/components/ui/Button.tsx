import { Loader } from 'lucide-react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}

const VARIANTS = {
  primary: `
    bg-blue-600 text-white
    hover:bg-blue-700 active:bg-blue-800
    dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700
  `,

  secondary: `
    bg-slate-200 text-slate-900
    hover:bg-slate-300 active:bg-slate-400
    dark:bg-slate-800 dark:text-slate-100
    dark:hover:bg-slate-700 dark:active:bg-slate-600
  `,

  outline: `
    border-2 border-slate-300 text-slate-900
    hover:bg-slate-50 active:bg-slate-100
    dark:border-slate-700 dark:text-slate-100
    dark:hover:bg-slate-800 dark:active:bg-slate-700
  `,

  danger: `
    bg-red-600 text-white
    hover:bg-red-700 active:bg-red-800
    dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700
  `,
}

const SIZES = {
  sm: 'px-3 py-2 text-xs font-semibold rounded-lg',
  md: 'px-4 py-3 text-sm font-semibold rounded-xl',
  lg: 'px-6 py-4 text-base font-bold rounded-xl h-14 w-full',
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]

        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader size={16} className="animate-spin opacity-80" />}

      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}

      {children}
    </button>
  )
}
