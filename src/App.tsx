import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

import { PanelPage } from '@/pages/PanelPage'
import { CreateIncidenciaPage } from '@/pages/CreateIncidenciasPage'
import { UserProfilePage } from '@/pages/UserProfilePage'
import { PersonalPage } from '@/pages/PersonalPage'
import { StatisticsPage } from '@/pages/StatisticsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'

import { PrivateRoute } from '@/components/routes/PrivateRoute'
import { PublicRoute } from '@/components/routes/PublicRoute'
import { RoleRoute } from '@/components/routes/RoleRoute'

import { MainLayout } from '@/components/layout/MainLayout'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { IncidenciaDetailPage } from './pages/IncidenciaDetailPage'
import { DepartamentosPage } from './pages/DepartamentosPage'
import { AreasPage } from './pages/AreasPage'
import { AreaDetailPage } from './pages/AreaDetailPage'

function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/panel" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

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
        <Route path="/areas" element={<AreasPage />} />
        <Route path="/areas/:areaId" element={<AreaDetailPage />} />
        <Route path="/createIncidencia" element={<CreateIncidenciaPage />} />
        <Route path="/userProfile" element={<UserProfilePage />} />
        <Route path="/incidencia/:id" element={<IncidenciaDetailPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />

        <Route
          path="/personal"
          element={
            <RoleRoute roles={[1]}>
              <PersonalPage />
            </RoleRoute>
          }
        />

        <Route
          path="/departamentos"
          element={
            <RoleRoute roles={[1]}>
              <DepartamentosPage />
            </RoleRoute>
          }
        />
      </Route>

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default App
