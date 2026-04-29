import { Link } from 'react-router-dom'
import { RegisterForm } from '@/components/features/register/RegisterForm'
import '../styles/LoginPage.css'
import '../styles/RegisterPage.css'

export const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Crear cuenta</h2>
        <p className="login-subtitle">
          Regístrate para acceder al centro de incidencias.
        </p>
        <RegisterForm />

        <Link to="/login" className="login-secondary-button">
          Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  )
}
