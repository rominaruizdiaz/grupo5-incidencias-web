import { ROLE_LABELS, ROLE_COLORS } from '@/utils/personal.constants'
import type { PersonalCardProps } from './personal.types'

export function PersonalCard({
  usuario,
  departamentos,
  onEdit,
  onDelete,
}: PersonalCardProps) {
  return (
    <div
      className="
        w-full rounded-3xl
        border border-slate-200
        bg-white p-4 shadow-sm transition

        sm:p-5
        md:hidden

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* HEADER */}
      <div className="mb-5">
        <h3
          className="
            break-words text-base font-bold tracking-tight
            text-slate-900

            sm:text-lg
            dark:text-white
          "
        >
          {usuario.nombre}
        </h3>

        <p
          className="
            mt-1 break-all text-xs
            text-slate-500

            sm:text-sm
            dark:text-slate-400
          "
        >
          {usuario.email}
        </p>
      </div>

      {/* INFO */}
      <div className="space-y-4">
        {/* ROL */}
        <div>
          <p
            className="
              mb-2 text-[11px] font-semibold uppercase tracking-wide
              text-slate-500

              sm:text-xs
              dark:text-slate-400
            "
          >
            Rol
          </p>

          <span
            className={`
              inline-flex max-w-full items-center
              rounded-full px-3 py-1
              text-[11px] font-semibold

              sm:text-xs
              ${ROLE_COLORS[usuario.rol]}
            `}
          >
            {ROLE_LABELS[usuario.rol]}
          </span>
        </div>

        {/* DEPARTAMENTOS */}
        <div>
          <p
            className="
              mb-2 text-[11px] font-semibold uppercase tracking-wide
              text-slate-500

              sm:text-xs
              dark:text-slate-400
            "
          >
            Departamentos
          </p>

          <div className="flex flex-wrap gap-2">
            {departamentos.filter(d =>
              (usuario as any).departamentos?.includes(d.id)
            ).length > 0 ? (
              departamentos
                .filter(d => (usuario as any).departamentos?.includes(d.id))
                .map(d => (
                  <span
                    key={d.id}
                    className="
                      break-words rounded-full
                      border border-slate-200
                      bg-slate-100 px-3 py-1
                      text-[11px] font-medium
                      text-slate-700

                      sm:text-xs

                      dark:border-slate-700
                      dark:bg-slate-800
                      dark:text-slate-300
                    "
                  >
                    {d.nombre}
                  </span>
                ))
            ) : (
              <span className="text-xs text-slate-400 sm:text-sm">
                Sin departamentos
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => onEdit(usuario)}
          className="
            min-w-0 w-full
            break-words rounded-2xl
            bg-blue-600 px-4 py-3
            text-sm font-semibold text-white
            transition

            hover:bg-blue-700
            active:scale-[0.98]
          "
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(usuario)}
          className="
            min-w-0 w-full
            break-words rounded-2xl
            bg-red-600 px-4 py-3
            text-sm font-semibold text-white
            transition

            hover:bg-red-700
            active:scale-[0.98]
          "
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
