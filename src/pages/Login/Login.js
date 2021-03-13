import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase, { auth } from 'firebase/config'

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     overflow: 'hidden',
//     padding: theme.spacing(0, 3),
//   },
//   paper: {
//     maxWidth: 400,
//     margin: `${theme.spacing(1)}px auto`,
//     padding: theme.spacing(2),
//   },
// }))

const Login = () => {
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => true,
    },
    // signInFlow: 'popup',
    signInSuccessUrl: '/admin',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      },
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
