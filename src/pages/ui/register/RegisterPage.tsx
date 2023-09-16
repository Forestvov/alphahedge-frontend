import { RegisterForm } from 'components/auth/RegisterForm'

export const RegisterPage = ({ isInvite = false }: { isInvite?: boolean }) => (
  <RegisterForm isInvite={isInvite} />
)
