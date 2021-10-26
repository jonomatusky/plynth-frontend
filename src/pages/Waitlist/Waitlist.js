import React from 'react'
import { Container, Box, Typography, Button, Hidden } from '@material-ui/core'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import FormWaitlist from 'components/FormWaitlist'

const Waitlist = () => {
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
            sx={{ textTransform: 'none' }}
          >
            <Typography color="#BBBBBB">
              <b>Sign In</b>
            </Typography>
          </Button>
        </>
      }
    >
      <Container maxWidth="xs">
        <Box mt={10} color="white">
          <Typography variant="h4" mb={2}>
            <b>Join the Waitlist</b>
          </Typography>
          <Typography variant="h6" mb={2}>
            Sign up here and we'll let you know as soon as it launches 👍
          </Typography>
          <FormWaitlist />
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Waitlist
