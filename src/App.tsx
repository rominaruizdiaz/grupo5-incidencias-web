import { Routes, Route } from 'react-router-dom'

import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

import { PanelPage } from '@/pages/PanelPage'
import { CreateIncidenciaPage } from '@/pages/CreateIncidenciasPage'
import { UserProfilePage } from '@/pages/UserProfilePage'

import { PrivateRoute } from '@/components/routes/PrivateRoute'
import { PublicRoute } from '@/components/routes/PublicRoute'

import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { IncidenciaDetailPage } from './pages/IncidenciaDetailPage'

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* APP */}
      <Route
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="/panel" element={<PanelPage />} />
        <Route path="/createIncidencia" element={<CreateIncidenciaPage />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/incidencia/:id" element={<IncidenciaDetailPage />} />
      </Route>

      {/* PAGINA 404 */}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default App
