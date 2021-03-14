import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase, { auth } from 'firebase/config'

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
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  }

  return (
    <Container maxWidth="xs">
      <Box pt={10}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Login
            </Typography>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
