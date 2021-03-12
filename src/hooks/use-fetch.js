import { useEffect, useContext } from 'react'

import { AuthContext } from 'contexts/auth-context'
import { useUserStore } from './store/use-user-store'
import { usePackStore } from './store/use-pack-store'

export const useFetch = () => {
  const auth = useContext(AuthContext)

  const { fetchUser } = useUserStore()
  const { fetchPacks } = usePackStore()

  useEffect(() => {
    const fetch = async () => {
      await fetchUser()
      await fetchPacks()
    }
    if (auth.token) {
      fetch()
    }
  }, [auth.token, fetchUser, fetchPacks])

  return
}
