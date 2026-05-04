import { Outlet } from 'react-router-dom'
import { BottomNav } from '../features/navegation/BottomNav'
import { SideNav } from '../features/navegation/SideNav'

// distribución base de las páginas públicas con la navegación
export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* SIDEBAR */}
      <SideNav />

      {/* CONTENIDO */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      {/* MÓVIL */}
      <BottomNav />
    </div>
  )
}
