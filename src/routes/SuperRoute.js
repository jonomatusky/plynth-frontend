import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'

const SuperRoute = ({ children, ...rest }) => {
  const { user, status } = useUserStore()

  return (
    <Route
      {...rest}
      render={() =>
        status === 'loading' ? (
          <LoadingScreen />
        ) : status === 'succeeded' && !!user.admin ? (
          children
        ) : (
          <Redirect to="/admin" />
        )
      }
    />
  )
}

export default SuperRoute
