import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSession } from 'hooks/use-session'

const RestrictedPublicRoute = ({ children, redirectPath, ...rest }) => {
  const { user } = useSession()

  return (
    <Route
      {...rest}
      render={() => (!user ? children : <Redirect to={redirectPath || '/'} />)}
    />
  )
}

export default RestrictedPublicRoute
