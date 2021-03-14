import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router'

import { AuthContext } from 'contexts/auth-context'
import { useUserStore } from './store/use-user-store'
import { usePackStore } from './store/use-pack-store'

export const useFetch = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const { fetchUser, status } = useUserStore()
  const { fetchPacks } = usePackStore()

  useEffect(() => {
    const fetch = async () => {
      try {
        await fetchUser()
      } catch (err) {
        console.log(err)
        if (err.message === 'Please complete your registration to continue.') {
          history.push('/admin/register')
        }
      }
    }
    if (auth.token) {
      fetch()
    }
  }, [auth.token, fetchUser, history])

  useEffect(() => {
    const fetch = async () => {
      await fetchPacks()
    }
    if (status === 'succeeded') {
      fetch()
    }
  }, [status, fetchPacks])

  return
}
