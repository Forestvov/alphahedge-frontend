import { RecoveryForm } from 'components/auth/RecoveryForm'

interface IRecoveryPage {
  checkToken?: boolean
}

export const RecoveryPage = ({ checkToken = false }: IRecoveryPage) => (
  <RecoveryForm checkToken={checkToken} />
)
