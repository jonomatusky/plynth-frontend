import React from 'react'
import { Container, Box, Grid, Typography, Link } from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'config/firebase'
import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import WebsiteNavBar from 'components/WebsiteNavBar'

const Login = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        console.log(authResult)
        return true
      },

      signInFailure: function (error) {
        console.log(error)
      },
    },
    signInFlow: 'popup',
    signInSuccessUrl: '/admin',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        buttonColor: '#CD0A64',
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      },
    ],
  }

  return (
    <PublicNav>
      <WebsiteNavBar />
      <Container maxWidth="xs">
        <Box pt={20}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" color="white">
                <b>Log In</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="body2" color="white">
                Don't have an account yet?{' '}
                <Link component={RouterLink} to="/admin/signup">
                  <b>Sign Up</b>
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Login
