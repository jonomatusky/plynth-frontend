import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import { UserContext } from 'contexts/user-context'
import { useAuth } from 'hooks/use-auth'

import Signup from 'pages/SignUp/SignUp'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import MyAccount from 'pages/MyAccount/MyAccount'
import MyPacks from 'pages/PacksView/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'
import EditAccess from 'pages/EditAccess.js/EditAccess'
import ViewPack from 'pages/ViewPack/ViewPack'
import AlertBar from 'components/AlertBar'
import NotFound from 'components/NotFound'

// import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const { user, logout, initializing } = useAuth()

  let routes

  console.log(initializing)

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          initializing ? (
            <></>
          ) : user ? (
            children
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          )
        }
      />
    )
  }

  routes = (
    <Switch>
      <Route path="/p/:packId">
        <ViewPack />
      </Route>
      <PrivateRoute path="/admin/packs/:packId/edit/cards" exact>
        <EditCards />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs/:packId/edit/appearance" exact>
        <EditAppearance />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs/:packId/edit/access" exact>
        <EditAccess />
      </PrivateRoute>
      <PrivateRoute path="/admin/account">
        <MyAccount />
      </PrivateRoute>
      <PrivateRoute path="/admin/register">
        <Register />
      </PrivateRoute>

      <Redirect path="/admin/packs" to="/admin" />

      <PrivateRoute path="/admin">
        <MyPacks />
      </PrivateRoute>

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )

  return (
    <UserContext.Provider value={{ user: user, logout: logout }}>
      <Router>
        <AlertBar />
        {routes}
      </Router>
    </UserContext.Provider>
  )
}

export default App
