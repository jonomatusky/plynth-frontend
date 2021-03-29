import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
// import firebase from 'firebase/app'
// import 'firebase/auth'
import firebase from 'config/firebase'
import { clearUser } from 'redux/userSlice'

export const useAuth = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
    }
  })

  const logout = useCallback(async () => {
    try {
      await firebase.auth().signOut()
      await dispatch(clearUser())
    } catch (err) {}
  }, [dispatch])

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setState({ initializing: false, user })
    })

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return { ...state, logout }
}
