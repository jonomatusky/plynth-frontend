import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSession } from 'hooks/use-session'

const PrivateRoute = ({ children, ...rest }) => {
  const { user, initializing } = useSession()

  console.log(initializing)

  return (
    <Route
      {...rest}
      render={() =>
        initializing ? <></> : !!user ? children : <Redirect to="/" />
      }
    />
  )
}

export default PrivateRoute
