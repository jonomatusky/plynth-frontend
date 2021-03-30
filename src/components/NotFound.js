import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Container, Grid, Typography, Link, Box } from '@material-ui/core'

import plynthLogoHeader from '../images/Plynth-Loading-Final.png'

import LogoBar from 'components/LogoBar'

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        align="center"
        justify="center"
        wrap="nowrap"
        spacing={1}
      >
        <Grid item>
          <Box mt="15vh" mb={1} maxWidth="80px">
            <img
              src={plynthLogoHeader}
              alt="Plynth Logo Large"
              style={{ maxWidth: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center">
            The page you’re looking for doesn’t exist.
          </Typography>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="always"
          >
            <Typography align="center">Back to Home</Typography>
          </Link>
        </Grid>
      </Grid>
      <LogoBar to="/" />
    </Container>
  )
}

export default NotFound
