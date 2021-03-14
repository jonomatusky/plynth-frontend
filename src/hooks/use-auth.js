import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { firebaseApp } from '../firebase/config'
import { auth } from 'firebase/config'
import { clearUser } from 'redux/userSlice'

export const useAuth = () => {
  const dispatch = useDispatch()

  const [authUser, setAuthUser] = useState(null)
  const [authStatus, setAuthStatus] = useState(null)
  const [token, setToken] = useState(null)

  console.log('auth status: ' + authStatus)

  const logout = useCallback(async () => {
    try {
      await auth.signOut()
      setToken(null)
      setAuthStatus('unauthenticated')
      dispatch(clearUser())
    } catch (err) {}
  }, [dispatch])

  useEffect(() => {
    const getToken = async () => {
      firebaseApp.auth().onAuthStateChanged(user => {
        if (!!user) {
          setAuthUser(user)
          setAuthStatus('authenticated')
          user.getIdToken().then(token => setToken(token))
        } else {
          setAuthStatus('unauthenticated')
        }
      })
    }
    getToken()
  }, [])

  return { authUser, token, authStatus, logout }
}
