import { useEffect } from 'react'
import { useHistory } from 'react-router'

import { useUserStore } from './store/use-user-store'
import { usePackStore } from './store/use-pack-store'
import { useSession } from './use-session'
import useAlertStore from './store/use-alert-store'

export const useFetch = () => {
  const { user } = useSession()
  const history = useHistory()

  const { fetchUser, status: fetchUserStatus } = useUserStore()
  const { fetchPacks, status: fetchPacksStatus } = usePackStore()
  const { clearError } = useAlertStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUser()
      } catch (err) {
        if (err.message === 'Please complete your registration to continue.') {
          clearError()
        }
      }
    }
    if (!!user && fetchUserStatus === 'idle') {
      fetch()
    }
  }, [user, history, fetchUser, fetchUserStatus, clearError])

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
