import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Grid,
  Typography,
  Box,
  // IconButton,
  Button,
  CircularProgress,
} from '@mui/material'
import useUserStore from 'hooks/store/use-user-store'
// import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'hooks/use-session'
import { Close } from '@mui/icons-material'
import PublicNav from 'layouts/PublicNav'

const OnTheWaitlist = () => {
  const { user, status } = useUserStore()
  const { logout } = useSession()
  const history = useHistory()

  useEffect(() => {
    if (status === 'succeeded' && user && user.tier !== 'trial') {
      history.push('/admin')
    } else if (status === 'failed') {
      history.push('/')
    }
  }, [history, status, user])

  return (
    <PublicNav
      hideFooter
      right={
        <Button
          type="button"
          onClick={logout}
          size="small"
          sx={{ textTransform: 'lowercase' }}
          endIcon={<Close color="secondary" />}
        >
          <Typography color="#BBBBBB">close</Typography>
        </Button>
      }
    >
      {(!user || user.tier !== 'trial') && (
        <Box
          height="400px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {user && user.tier === 'trial' && (
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            align="center"
            justifyContent="center"
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>
              <Box mt="20vh" mb={1} maxWidth="80px" />
            </Grid>
            <Grid item>
              <Typography variant="h4" align="center" color={'white'} mb={2}>
                <b>You're on the Waitlist</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                Your portal at <b>leaflet.so/{user.username}</b> has been
                reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                We're opening up new spots as quickly as possible. We'll let you
                know as soon as one is available.
              </Typography>
            </Grid>
            {/* <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                In the meantime, follow us for updates:
              </Typography>
            </Grid>
            <Grid item container spacing={3} justifyContent="center">
              <Grid item>
                <IconButton
                  href={'https://www.instagram.com/plynthplayer/'}
                  target="_blank"
                  size="large"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    color="white"
                    size="lg"
                    fontSize="24px"
                  />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  href={'https://www.tiktok.com/@plynth'}
                  target="_blank"
                  size="large"
                >
                  <FontAwesomeIcon
                    icon={faTiktok}
                    color="white"
                    size="lg"
                    fontSize="24px"
                  />
                </IconButton>
              </Grid>
            </Grid> */}
          </Grid>
        </Container>
      )}
    </PublicNav>
  )
}

export default OnTheWaitlist
