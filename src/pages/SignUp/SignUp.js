import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'config/firebase'
import { Link } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'

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
    signInSuccessUrl: '/admin',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: 'Sign up with email',
        buttonColor: '#CD0A64',
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Sign up with Google',
      },
    ],
  }

  return (
    <PublicNav>
      <Container maxWidth="xs">
        <Box pt={20}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                <b>Create Account</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign="center" variant="body2">
                Already have an account? <Link to="/">Sign In</Link>
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
