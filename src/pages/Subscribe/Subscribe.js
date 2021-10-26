import React from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Hidden,
  Grid,
} from '@material-ui/core'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'

import FormSubscribe from 'components/FormSubscribe'

const Subscribe = ({ title, text }) => {
  return (
    <PublicNav
      right={
        <>
          <Hidden smDown>
            <Typography variant="body2" color="white">
              Already have an account?{' '}
            </Typography>
          </Hidden>
          <Button
            color="secondary"
            component={RouterLink}
            to={'/login'}
            size="small"
            sx={{ textTransform: 'lowercase' }}
          >
            <Typography color="#BBBBBB">
              <b>Sign In</b>
            </Typography>
          </Button>
        </>
      }
      hideFooter
    >
      <Container maxWidth="xs">
        <Box mt={10}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="white">
                <b>Subscribe</b>
              </Typography>
            </Grid>
            <Grid item xs={12} mb={2}>
              <Typography color="white">
                Subscribe below for updates from the Plynth team.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormSubscribe />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Subscribe
