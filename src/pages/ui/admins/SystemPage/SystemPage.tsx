import { ProfileTokens } from 'components/personal/ProfileBody/ui/ProfileEditor/ProfileTokens'

export const SystemPage = ({ isAdmin = false }: { isAdmin?: boolean }) => (
  <ProfileTokens isAdmin={isAdmin} />
)
