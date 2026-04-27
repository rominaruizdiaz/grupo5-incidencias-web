import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
        <Outlet />
      </div>
    </div>
  )
}
