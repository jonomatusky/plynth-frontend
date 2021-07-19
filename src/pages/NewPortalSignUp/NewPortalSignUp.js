import React from 'react'
import {
  Link,
  Container,
  Box,
  Grid,
  Typography,
  Button,
} from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import firebase from 'config/firebase'
import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import WebsiteNavBar from 'components/WebsiteNavBar'
import TextFieldWebsite from 'components/TextFieldWebsite'

const NewPortalSignUp = () => {
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
        requireDisplayName: false,
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
      <WebsiteNavBar
        right={
          <Typography variant="body2" color="white">
            Already have an account?{' '}
            <Button
              component={RouterLink}
              to={'/admin/login'}
              size="small"
              sx={{ textTransform: 'lowercase' }}
            >
              <Typography color="#BBBBBB">
                <b>_</b>sign in
              </Typography>
            </Button>
          </Typography>
        }
      />
      <Container maxWidth="xs">
        <Box pt={20}>
          <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="white">
                <b>Claim your portal</b>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="white" variant="h6" mb={1}>
                Enter your email address
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextFieldWebsite
                variant="outlined"
                fullWidth
                size="small"
                placeholder="email"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default NewPortalSignUp
