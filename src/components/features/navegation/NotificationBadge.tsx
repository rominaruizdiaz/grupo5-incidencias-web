type Props = {
  count: number
}

// icono interactivo de notificaciones
export const NotificationBadge = ({ count }: Props) => {
  if (count <= 0) return null

  return (
    <span
      className="
        absolute -left-1 -top-2
        min-w-4 h-4 px-[5px]
        flex items-center justify-center

        text-[10px] font-bold
        rounded-full

        bg-red-600 text-white
        shadow-sm shadow-red-600/30

        dark:bg-red-500 dark:shadow-red-500/20
      "
    >
      {count > 9 ? '9+' : count}
    </span>
  )
}
