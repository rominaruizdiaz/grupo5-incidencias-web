import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
