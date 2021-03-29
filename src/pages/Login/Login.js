import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'config/firebase'
import { Link } from 'react-router-dom'

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
    <Container maxWidth="xs">
      <Box pt={20}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              <b>Sign In</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign="center" variant="body2">
              Don't have an account yet? <Link to="/signup">Sign Up</Link>
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
  )
}

export default Login
