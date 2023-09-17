import { RecoveryForm } from 'components/auth/RecoveryForm'

export const RecoveryPage = ({
  checkToken = false,
}: {
  checkToken?: boolean
}) => <RecoveryForm checkToken={checkToken} />
