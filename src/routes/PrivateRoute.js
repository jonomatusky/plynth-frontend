import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSession } from 'hooks/use-session'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, initializing } = useSession()

  return (
    <Route
      {...rest}
      render={props =>
        initializing ? (
          <></>
        ) : !!user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default PrivateRoute
