import { Outlet } from 'react-router-dom'

//layout de login y register
export const AuthLayout = () => {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-none lg:w-full">
        <Outlet />
      </div>
    </div>
  )
}
