import { RegisterForm } from '@/components/features/register/RegisterForm'
import { AuthLayout } from '@/components/layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  )
}
