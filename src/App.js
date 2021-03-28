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

import Signup from 'pages/SignUp/SignUp'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import MyAccount from 'pages/MyAccount/MyAccount'
import MyPacks from 'pages/PacksView/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'
import EditBar from 'components/EditBar'
import AdminNav from 'components/AdminNav'
import EditAccess from 'pages/EditAccess.js/EditAccess'
import ViewPack from 'pages/ViewPack/ViewPack'
import AlertBar from 'components/AlertBar'

// import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  firebase.app()

  let routes
  const { authUser: firebaseUser, token, authStatus, logout } = useAuth()

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
                  pathname: '/',
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
    <>
      <DomRoute component={AdminNav} path="/admin" />
      <DomRoute component={EditBar} path="/admin/packs/:packId/edit" />
      <Switch>
        <DomRoute component={ViewPack} path="/p/:packId" />
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
          component={EditAccess}
          path="/admin/packs/:packId/edit/access"
          exact
        />
        <Route component={MyAccount} path="/admin/account" />
        <Route component={Register} path="/admin/register" />

        <Redirect path="/admin/packs" to="/admin" />

        <Route component={MyPacks} path="/admin" />

        <DomRoute component={Signup} path="/signup" />
        <DomRoute component={Login} path="/login" />
        <Route publicRoute component={Login} path="/" />
      </Switch>
    </>
  )

  return (
    <AuthContext.Provider
      value={{
        authUser: firebaseUser,
        authStatus: authStatus,
        token: token,
        logout: logout,
      }}
    >
      <Router>
        <AlertBar />
        {routes}
      </Router>
    </AuthContext.Provider>
  )
}

export default App
