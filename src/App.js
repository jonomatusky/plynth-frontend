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
import NewPortalSignUp from 'pages/NewPortalSignUp/NewPortalSignUp'

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

      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/admin/signup">
        <Signup />
      </Route>
      <Route path="/admin/login">
        <Login />
      </Route>

      <PrivateRoute path="/admin/packs/:packId/edit/cards">
        <EditCards />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs/:packId/edit/appearance">
        <EditAppearance />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs/:packId/edit/access">
        <EditAccess />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs/:packId/edit/settings">
        <EditSettings />
      </PrivateRoute>
      <PrivateRoute path="/admin/portal/appearance">
        <EditPortalAppearance />
      </PrivateRoute>
      <PrivateRoute path="/admin/portal/animation">
        <EditPortalAnimation />
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

      <Route path="/pickup" exact>
        <NewPickup />
      </Route>
      <Route path="/s/waitlist">
        <Waitlist />
      </Route>
      <Route path="/s/contact">
        <Contact />
      </Route>
      <Route path="/s/new-portal">
        <NewPortalSignUp />
      </Route>
      <Route path="/test/loading">
        <TestLoading />
      </Route>
      <Route path="/test/nomatch">
        <TestNoMatch />
      </Route>
      <Route path="/test/register">
        <Register />
      </Route>
      <Route path="/groundup">
        <GroundUP />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route restricted={false} path="/:username/open" exact>
        <PortalOpen />
      </Route>

      <Route restricted={false} path="/:username">
        <Portal />
      </Route>

      <Route>
        <NotFoundPage />
      </Route>
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
