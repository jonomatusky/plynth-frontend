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
import Login from 'pages/Login/Login'
import MyPacks from 'pages/PacksView/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'
import EditAccess from 'pages/EditAccess.js/EditAccess'
import ViewPack from 'pages/ViewPack/ViewPack'
import AlertBar from 'components/AlertBar'
import EditSettings from 'pages/EditSettings/EditSettings'
import Home from 'pages/Home/Home'
import TestLoading from 'pages/TestLoading/TestLoading'
import TestNoMatch from 'pages/TestNoMatch/TestNoMatch'
import GroundUP from 'pages/GroundUP/GroundUP'
import Contact from 'pages/Contact/Contact'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import EditPortalAppearance from 'pages/EditPortalAppearance/EditPortalAppearance'
import MyAccount from 'pages/MyAccount/MyAccount'
import Portal from 'pages/Portal/Portal'
import EditPortalAnimation from 'pages/EditPortalAnimation/EditPortalAnimation'
import PortalOpen from 'pages/PortalOpen/PortalOpen'
import Register from 'pages/Register/Register'
import RegisterUsername from 'pages/RegisterUsername/RegisterUsername'
import SuperRoute from 'routes/SuperRoute'
import SuperAdmin from 'pages/SuperAdmin/SuperAdmin'
import SignUpWithCode from 'pages/SignUpWithCode/SignUpWithCode'
import OnTheWaitlist from 'pages/OnTheWaitlist/OnTheWaitlist'
import Recover from 'pages/Recover/Recover'
import Help from 'pages/Help/Help'
import Subscribe from 'pages/Subscribe/Subscribe'
import TryIt from 'pages/TryIt/TryIt'
import TryItTest from 'pages/TryItTest/TryItTest'
import LandingAR from 'pages/LandingAR/LandingAR'
import LandingARDemo from 'pages/LandingARDemo/LandingARDemo'

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
      <Route path="/p/:packId">
        <ViewPack />
      </Route>

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/recover">
        <Recover />
      </Route>

      <PrivateRoute path="/register/username">
        <RegisterUsername />
      </PrivateRoute>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/ar" exact>
        <LandingARDemo />
      </Route>

      <Redirect path="/signup" exact to="/register" />

      <PrivateRoute path="/try-it/test">
        <TryItTest />
      </PrivateRoute>
      <Route path="/try-it">
        <TryIt />
      </Route>
      <Route path="/s/subscribe">
        <Subscribe />
      </Route>
      <Route path="/s/contact">
        <Contact />
      </Route>
      <Route path="/s/help">
        <Help />
      </Route>
      <Route path="/s/ar" exact>
        <LandingAR />
      </Route>

      <Route path="/s/invite-code" exact>
        <SignUpWithCode />
      </Route>
      <Route path="/s/waitlist">
        <Register
          title="Join the Waitlist"
          text="We're currently in a closed beta and adding new users as quickly as possible. Sign up here to reserve your portal and we'll let you know when new spots open up 👍"
        />
      </Route>
      <PrivateRoute path="/s/on-the-waitlist">
        <OnTheWaitlist />
      </PrivateRoute>

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
      <Redirect path="/admin/portal" to="/admin/portal/appearance" />

      <PrivateRoute path="/admin/account">
        <MyAccount />
      </PrivateRoute>
      <PrivateRoute path="/admin/packs">
        <MyPacks />
      </PrivateRoute>

      <SuperRoute path="/admin/super">
        <SuperAdmin />
      </SuperRoute>

      <Redirect path="/admin" to="/admin/packs" />

      {/* <Route path="/pickup" exact>
        <NewPickup />
      </Route> */}

      <Route path="/test/loading">
        <TestLoading />
      </Route>
      <Route path="/test/nomatch">
        <TestNoMatch />
      </Route>
      <Route path="/groundup">
        <GroundUP />
      </Route>
      <Redirect path="/s" exact to="/" />
      <Redirect path="/s" to="/" />
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
