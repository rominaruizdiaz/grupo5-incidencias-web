// icono interactivo de notificaciones
type Props = {
  count: number
}

export const NotificationBadge = ({ count }: Props) => {
  if (count <= 0) return null

  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  )
}
