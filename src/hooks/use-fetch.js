import { useEffect, useContext } from 'react'

import { AuthContext } from 'contexts/auth-context'
import { useUserStore } from './store/use-user-store'

export const useFetch = () => {
  const auth = useContext(AuthContext)

  const { fetchUser } = useUserStore()

  useEffect(() => {
    const fetch = async () => {
      console.log('fetching')
      await fetchUser()
    }
    if (auth.token) {
      fetch()
    }
  }, [auth.token, fetchUser])

  return
}
