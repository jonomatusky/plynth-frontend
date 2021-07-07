import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { UserContext } from 'contexts/user-context'
import { useAuth } from 'hooks/use-auth'
import firebase from 'config/firebase'
import posthog from 'posthog-js'

import PrivateRoute from 'routes/PrivateRoute'
import Signup from 'pages/SignUp/SignUp'
import Login from 'pages/Login/Login'
import Register from 'pages/Register/Register'
import MyPacks from 'pages/PacksView/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'
import EditAccess from 'pages/EditAccess.js/EditAccess'
import ViewPack from 'pages/ViewPack/ViewPack'
import AlertBar from 'components/AlertBar'
import EditSettings from 'pages/EditSettings/EditSettings'
import NewPickup from 'pages/Pickup/Pickup'
import Home from 'pages/Home/Home'
import TestLoading from 'pages/TestLoading/TestLoading'
import TestNoMatch from 'pages/TestNoMatch/TestNoMatch'
import GroundUP from 'pages/GroundUP/GroundUP'
import Waitlist from 'pages/Waitlist/Waitlist'
import Contact from 'pages/Contact/Contact'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import EditPortalAppearance from 'pages/EditPortalAppearance/EditPortalAppearance'
import MyAccount from 'pages/MyAccount/MyAccount'
import Portal from 'pages/Portal/Portal'
import EditPortalAnimation from 'pages/EditPortalAnimation/EditPortalAnimation'
import PortalOpen from 'pages/PortalOpen/PortalOpen'

const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  const { user, logout, initializing } = useAuth()

  posthog.init(REACT_APP_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
  })

  firebase.analytics()

  let routes

  routes = (
    <Switch>
      <Route component={ViewPack} path="/p/:packId" />

      <Route component={Signup} path="/signup" />
      <Route component={Signup} path="/admin/signup" />
      <Route component={Login} path="/admin/login" />

      <PrivateRoute
        component={EditCards}
        path="/admin/packs/:packId/edit/cards"
      />
      <PrivateRoute
        component={EditAppearance}
        path="/admin/packs/:packId/edit/appearance"
      />
      <PrivateRoute
        component={EditAccess}
        path="/admin/packs/:packId/edit/access"
      />
      <PrivateRoute
        component={EditSettings}
        path="/admin/packs/:packId/edit/settings"
      />
      <PrivateRoute
        component={EditPortalAppearance}
        path="/admin/portal/appearance"
      />
      <PrivateRoute
        component={EditPortalAnimation}
        path="/admin/portal/animation"
      />
      <PrivateRoute component={MyAccount} path="/admin/account" />
      <PrivateRoute component={Register} path="/admin/register" />
      <Redirect path="/admin/packs" to="/admin" />
      <PrivateRoute component={MyPacks} path="/admin" />

      <Route publicRoute={true} component={NewPickup} path="/pickup" exact />
      <Route component={Waitlist} path="/s/waitlist" />
      <Route component={Contact} path="/s/contact" />
      <Route component={TestLoading} path="/test/loading" />
      <Route component={TestNoMatch} path="/test/nomatch" />
      <Route component={Register} path="/test/register" />
      <Route component={GroundUP} path="/groundup" />
      <Route component={Home} path="/" exact />

      <Route
        publicRoute={true}
        restricted={false}
        component={PortalOpen}
        path="/:username/open"
        exact
      />

      <Route
        publicRoute={true}
        restricted={false}
        component={Portal}
        path="/:username"
      />

      <Route component={NotFoundPage} />
    </Switch>
  )

  return (
    <UserContext.Provider
      value={{ user: user, logout: logout, initializing: initializing }}
    >
      <Router>
        <AlertBar />
        {routes}
      </Router>
    </UserContext.Provider>
  )
}

export default App
