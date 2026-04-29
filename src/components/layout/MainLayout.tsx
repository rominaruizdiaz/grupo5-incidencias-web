import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'
import { BottomNav } from './BottomNav'
import '@/styles/MainLayout.css'

export const MainLayout = () => {
  return (
    <div className="layout-container">
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
