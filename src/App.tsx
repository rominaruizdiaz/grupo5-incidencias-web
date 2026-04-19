import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@/pages/LoginPage'
import { PanelPage } from '@/pages/PanelPage'
import { PrivateRoute } from '@/components/routes/PrivateRoute'
import { PublicRoute } from '@/components/routes/PublicRoute'

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

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/panel"
        element={
          <PrivateRoute>
            <PanelPage />
          </PrivateRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default App
