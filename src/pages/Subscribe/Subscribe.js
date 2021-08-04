import React from 'react'
import { Container, Box, Typography, Button, Hidden } from '@material-ui/core'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'

import FormSubscribe from 'components/FormSubscribe'

const Register = ({ title, text }) => {
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
              <b>_sign in</b>
            </Typography>
          </Button>
        </>
      }
      hideFooter
    >
      <Container maxWidth="xs">
        <Box mt={10}>
          <FormSubscribe />
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Register
