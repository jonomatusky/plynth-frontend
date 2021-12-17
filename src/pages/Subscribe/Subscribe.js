import React from 'react'
import { Container, Box, Typography, Button, Grid } from '@mui/material'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import ReactPlayer from 'react-player'

import FormSubscribe from 'components/FormSubscribe'

const Subscribe = ({ title, text }) => {
  return (
    <PublicNav
      right={
        <>
          <Typography
            variant="body2"
            color="white"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Already have an account?{' '}
          </Typography>
          <Button
            color="primary"
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
      <Container maxWidth="xs" disableGutters>
        <Box mt={5}>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <Typography variant="h5">
                <b>Bring your work to life with Plynth</b>
              </Typography>
            </Grid>
            <Grid item xs={11} mb={2}>
              <Typography>Enter your email for updates:</Typography>
            </Grid>
            <Grid item xs={11}>
              <FormSubscribe />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
              mt={5}
            >
              <Box
                overflow="hidden"
                width="100vw"
                height="500px"
                display="flex"
                jusifycontent="center"
                alignItems="center"
              >
                <ReactPlayer
                  url="https://vimeo.com/638810680"
                  height="150vh"
                  width="100vw"
                  overflow="hidden"
                  playsinline={true}
                  loop={true}
                  playing={true}
                  config={{ vimeo: { playerOptions: { background: 1 } } }}
                  // onReady={() => setVideoIsReady(true)}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Subscribe
