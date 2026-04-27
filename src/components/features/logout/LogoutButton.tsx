import { useLogout } from '../../../hooks/useLogout'

export const LogoutButton = () => {
  const { handleLogout } = useLogout()

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200"
    >
      Cerrar sesión
    </button>
  )
}
