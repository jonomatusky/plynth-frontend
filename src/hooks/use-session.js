import { useContext } from 'react'

import { UserContext } from 'contexts/user-context'

export const useSession = () => {
  const { user, logout } = useContext(UserContext)
  return { user, logout }
}
