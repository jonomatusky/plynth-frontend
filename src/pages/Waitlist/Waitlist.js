import React from 'react'
import { Container, Box, Typography, Button } from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import FormWaitlist from 'components/FormWaitlist'

const Waitlist = () => {
  return (
    <PublicNav
      right={
        <>
          <Typography
            variant="body2"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Already have an account?{' '}
          </Typography>
          <Button
            component={RouterLink}
            to={'/login'}
            size="small"
            sx={{ textTransform: 'none' }}
          >
            <Typography>
              <b>Sign In</b>
            </Typography>
          </Button>
        </>
      }
    >
      <Container maxWidth="xs">
        <Box mt={10}>
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
