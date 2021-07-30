import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useUserStore } from './store/use-user-store'
import { usePackStore } from './store/use-pack-store'
import { useSession } from './use-session'
import posthog from 'posthog-js'
import useAlertStore from './store/use-alert-store'

export const useFetch = type => {
  const { user } = useSession()
  const history = useHistory()
  const { setError } = useAlertStore()

  const { fetchUser, status: fetchUserStatus, user: storeUser } = useUserStore()
  const { fetchPacks, status: fetchPacksStatus } = usePackStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUser()
      } catch (err) {
        if (type !== 'public') {
          if (err.message === 'NOT_REGISTERED') {
            history.push('/register/username')
          } else {
            setError({ message: err.message })
          }
        }
      }
    }

    if (!!user && fetchUserStatus === 'idle') {
      fetch()
    }
  }, [user, history, fetchUser, fetchUserStatus, setError, type])

  useEffect(() => {
    if (!!storeUser.username) {
      posthog.people.set({ username: storeUser.username })
    }
  }, [storeUser.username])

  useEffect(() => {
    const fetch = async () => {
      await fetchPacks()
    }
    if (fetchUserStatus === 'succeeded' && fetchPacksStatus === 'idle') {
      fetch()
    }
  }, [fetchUserStatus, fetchPacksStatus, fetchPacks])

  return
}
