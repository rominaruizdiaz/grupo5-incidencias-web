import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { BottomNav } from './BottomNav'

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/*  PC */}
      <TopNav />

      {/* MAIN */}
      <main className="pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* MÓVIL */}
      <BottomNav />
    </div>
  )
}
