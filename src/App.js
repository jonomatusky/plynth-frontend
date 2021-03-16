import React from 'react'
import {
  BrowserRouter as Router,
  Route as DomRoute,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom'

import firebase from './firebase/config'
import { AuthContext } from 'contexts/auth-context'
import { useFetch } from 'hooks/use-fetch'
import { useAuth } from 'hooks/use-auth'

import Home from 'pages/Home/Home'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import MyAccount from 'pages/MyAccount/MyAccount'
import MyPacks from 'pages/Packs/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'

// import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  firebase.app()

  let routes
  const { authUser: firebaseUser, token, authStatus } = useAuth()

  const Route = ({
    component: Component,
    noNav,
    publicRoute,
    superadmin,
    restricted,
    ...rest
  }) => {
    useFetch()
    const location = useLocation()

    // const {
    //   user,
    //   status,
    // } = useSelector(state => state.user)

    // useEffect(() => {
    //   posthog.capture('$pageview')
    // }, [location])

    return (
      <DomRoute
        {...rest}
        render={props => (
          <>
            {/* Public Route - Unrestricted - User: Show component */}
            {publicRoute && !restricted && (
              <main>
                <Component {...props} />
              </main>
            )}
            {/* Public Route - Restricted - Unauthenticated: Show Componenet */}
            {publicRoute && restricted && authStatus === 'unauthenticated' && (
              <main>
                <Component {...props} />
              </main>
            )}
            {/* Public Route - Restricted - Authenticated: Redirect to admin */}
            {publicRoute && restricted && authStatus === 'authenticated' && (
              <Redirect to={(location.state || {}).referrer || '/admin'} />
            )}
            {/* Private Route - Unathenticated: Redirect to login */}
            {!publicRoute && authStatus === 'unauthenticated' && (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { referrer: '/' },
                }}
              />
            )}
            {/* Private Route - Authenticated - User: Show Component */}
            {!publicRoute && authStatus === 'authenticated' && (
              <main>
                <Component {...props} />
              </main>
            )}
          </>
        )}
      />
    )
  }

  routes = (
    <Switch>
      <Route publicRoute component={Home} path="/" exact />

      <DomRoute component={Login} path="/login" exact />
      <Route component={MyPacks} path="/admin" exact />
      <Route
        component={EditCards}
        path="/admin/packs/:packId/edit/cards"
        exact
      />
      <Route
        component={EditAppearance}
        path="/admin/packs/:packId/edit/appearance"
        exact
      />
      <Route
        component={EditCards}
        path="/admin/packs/:packId/edit/access"
        exact
      />
      <Route component={MyAccount} path="/admin/account" exact />
      <Route component={Register} path="/admin/register" exact />
    </Switch>
  )

  return (
    <AuthContext.Provider
      value={{
        authUser: firebaseUser,
        authStatus: authStatus,
        token: token,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  )
}

export default App
