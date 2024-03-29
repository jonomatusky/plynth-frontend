import React from 'react'
import 'aframe'
import 'mind-ar/dist/mindar-image.prod.js'
import 'mind-ar/dist/mindar-image-aframe.prod.js'

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
import ReactGA from 'react-ga'

import PrivateRoute from 'routes/PrivateRoute'
import Login from 'pages/Login/Login'
import MyPacks from 'pages/PacksView/PacksView'

import EditCards from 'pages/EditCards/EditCards'
import EditAppearance from 'pages/EditAppearance/EditAppearance'
import EditAccess from 'pages/EditAccess.js/EditAccess'
import ViewPack from 'pages/ViewPack/ViewPack'
import AlertBar from 'components/AlertBar'
import EditSettings from 'pages/EditSettings/EditSettings'
// import Home from 'pages/Home/Home'
import TestLoading from 'pages/TestLoading/TestLoading'
import TestNoMatch from 'pages/TestNoMatch/TestNoMatch'
import GroundUP from 'pages/GroundUP/GroundUP'
// import Contact from 'pages/Contact/Contact'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import EditPortalAppearance from 'pages/EditPortalAppearance/EditPortalAppearance'
import MyAccount from 'pages/MyAccount/MyAccount'
import Portal from 'pages/Portal/Portal'
import EditPortalAnimation from 'pages/EditPortalAnimation/EditPortalAnimation'
import PortalOpen from 'pages/PortalOpen/PortalOpen'
// import Register from 'pages/Register/Register'
// import RegisterUsername from 'pages/RegisterUsername/RegisterUsername'
import SuperRoute from 'routes/SuperRoute'
import SuperAdmin from 'pages/SuperAdmin/SuperAdmin'
// import SignUpWithCode from 'pages/SignUpWithCode/SignUpWithCode'
// import OnTheWaitlist from 'pages/OnTheWaitlist/OnTheWaitlist'
import Recover from 'pages/Recover/Recover'
import Help from 'pages/Help/Help'
// import Subscribe from 'pages/Subscribe/Subscribe'
// import Waitlist from 'pages/Waitlist/Waitlist'
import Admin from 'pages/Admin/Admin'
import Pieces from 'pages/Pieces/Pieces'
// import EditPiece from 'pages/EditPieceOLD/EditPiece'
import EditPiece from 'pages/EditPiece/EditPiece'
import SignUp from 'pages/SignUp/SignUp'
import Preview from 'pages/Preview/Preview'
// import JoinTheBeta from 'pages/JoinTheBeta/JoinTheBeta'
import LivelySignUp from 'pages/SignUp/LivelySignUp'
import Privacy from 'pages/Privacy/Privacy'
import Terms from 'pages/Terms/Terms'
import DSARForm from 'pages/DSARForm/DSARForm'
import QrScan from 'pages/QrScan/QrScan'
import DemoPreview from 'pages/Preview/DemoPreview'

const { REACT_APP_POSTHOG_KEY } = process.env

const App = () => {
  const { user, logout, initializing } = useAuth()

  posthog.init(REACT_APP_POSTHOG_KEY, {
    api_host: 'https://app.posthog.com',
  })

  ReactGA.initialize('UA-136166229-3')

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

      {/* <PrivateRoute path="/register/username">
        <RegisterUsername />
      </PrivateRoute>

      <Route path="/register">
        <Register />
      </Route> */}

      {/* <Route
        exact
        path="/signup"
        render={() => {
          window.location = 'https://airtable.com/shrW23ippm05xPTYg'

          return <></>
        }}
      /> */}

      <Route path="/signup" redirectPath={'/admin'} exact>
        <SignUp />
      </Route>

      <Route path="/s/lively-signup" redirectPath={'/admin'} exact>
        <LivelySignUp />
      </Route>

      <Route path="/s/privacy" exact>
        <Privacy />
      </Route>

      <Route path="/s/terms" exact>
        <Terms />
      </Route>

      <Route path="/s/dsar" exact>
        <DSARForm />
      </Route>

      <Route
        exact
        path="/card"
        render={() => {
          window.location = 'https://ar.plynth.com/card'

          return <></>
        }}
      />
      {/* 
      <RestrictedPublicRoute
        path="/s/try-it"
        redirectPath={'/admin/pieces/new'}
      >
        <EditPiece />
      </RestrictedPublicRoute> */}

      {/* <PrivateRoute path="/try-it/test">
        <TryItTest />
      </PrivateRoute>
      <Route path="/try-it">
        <TryIt />
      </Route> */}
      <Route
        exact
        path="/s/subscribe"
        render={() => {
          window.location = 'https://site.plynth.com/get-updates'

          return <></>
        }}
      />
      <Route
        exact
        path="/s/contact"
        render={() => {
          window.location = 'https://site.plynth.com/contact'

          return <></>
        }}
      />
      <Route path="/s/help">
        <Help />
      </Route>

      <Route path="/s/demo">
        <DemoPreview />
      </Route>
      {/* <Route path="/s/join-the-beta">
        <JoinTheBeta />
      </Route> */}

      {/* <Route path="/s/invite-code" exact>
        <SignUpWithCode />
      </Route> */}
      {/* <Route path="/s/waitlist">
        <Waitlist />
      </Route>
      <PrivateRoute path="/s/on-the-waitlist">
        <OnTheWaitlist />
      </PrivateRoute> */}

      <Route path="/preview/:pieceId/:cardId">
        <Preview />
      </Route>

      <PrivateRoute path="/admin/pieces/:pieceId/edit">
        <EditPiece />
      </PrivateRoute>
      <PrivateRoute path="/admin/pieces">
        <Pieces />
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

      <PrivateRoute path="/admin" exact>
        <Admin />
      </PrivateRoute>

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
      <Route
        exact
        path="/"
        render={() => {
          window.location = 'https://site.plynth.com/'

          return <></>
        }}
      />

      <Route restricted={false} path="/:username/open" exact>
        <PortalOpen />
      </Route>

      <Route path="/:username/qr/:qrId">
        <QrScan />
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
