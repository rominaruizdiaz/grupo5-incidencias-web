import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/components/features/login/LoginForm'

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
