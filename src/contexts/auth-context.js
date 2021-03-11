import { createContext } from 'react'

export const AuthContext = createContext({
  authUser: null,
  authStatus: null,
  token: null,
})
