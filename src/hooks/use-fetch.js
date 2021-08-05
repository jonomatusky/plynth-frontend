import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useUserStore } from './store/use-user-store'
import { usePackStore } from './store/use-pack-store'
import { useSession } from './use-session'
import posthog from 'posthog-js'
import useAlertStore from './store/use-alert-store'

export const useFetch = () => {
  const { user } = useSession()
  const history = useHistory()
  const { setError } = useAlertStore()

  const {
    fetchUser,
    status: fetchUserStatus,
    user: storeUser,
    createMeStatus,
  } = useUserStore()
  const { fetchPacks, status: fetchPacksStatus } = usePackStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUser()
      } catch (err) {
        setError({ message: err.message })
      }
    }

    if (!!user && fetchUserStatus === 'idle') {
      fetch()
    }
  }, [user, history, fetchUser, fetchUserStatus, setError])

  useEffect(() => {
    if (!!storeUser.username) {
      posthog.people.set({ username: storeUser.username })
    }
  }, [storeUser.username])

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchPacks()
      } catch (err) {}
    }
    if (
      fetchUserStatus === 'succeeded' &&
      fetchPacksStatus === 'idle' &&
      storeUser._id
    ) {
      fetch()
    }
  }, [
    fetchUserStatus,
    fetchPacksStatus,
    fetchPacks,
    user,
    storeUser,
    createMeStatus,
  ])

  return
}
