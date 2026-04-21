import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { PanelPage } from '@/pages/PanelPage'
import { PrivateRoute } from '@/components/routes/PrivateRoute'
import { PublicRoute } from '@/components/routes/PublicRoute'
import { CreateIncidenciaPage } from './pages/CreateIncidenciasPage'
import { RegisterPage } from './pages/RegisterPage'
import { UserProfilePage } from './pages/UserProfilePage'

function App() {
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/panel"
        element={
          <PrivateRoute>
            <PanelPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/createIncidencia"
        element={
          <PrivateRoute>
            <CreateIncidenciaPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/userProfile"
        element={
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default App
