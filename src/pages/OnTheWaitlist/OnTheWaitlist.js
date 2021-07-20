import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Grid, Typography, Box, IconButton } from '@material-ui/core'
import WebsiteNavBar from 'components/WebsiteNavBar'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OnTheWaitlist = () => {
  const { user, status } = useUserStore()
  const history = useHistory()

  useEffect(() => {
    if (status === 'succeeded' && user && user.tier !== 'trial') {
      history.push('/admin')
    } else if (status === 'failed') {
      console.log('pushing to home')
      history.push('/')
    }
  }, [history, status, user])

  console.log(status)
  return (
    <>
      <WebsiteNavBar />
      {(!user || user.tier !== 'trial') && <LoadingScreen />}
      {user && user.tier === 'trial' && (
        <Container maxWidth="sm">
          <Grid
            container
            direction="column"
            align="center"
            justify="center"
            wrap="nowrap"
            spacing={2}
          >
            <Grid item>
              <Box mt="20vh" mb={1} maxWidth="80px" />
            </Grid>
            <Grid item>
              <Typography variant="h4" align="center" color={'white'}>
                <b>You're on the Waitlist</b>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                Your portal at <b>plynth.com/{user.username}</b> has been
                reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                We're opening up new spots as quickly as possible. We'll let you
                know as soon as one is available.
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" align="center" color={'white'}>
                In the meantime, follow us for updates:
              </Typography>
            </Grid>
            <Grid item container spacing={3} justifyContent="center">
              <Grid item>
                <IconButton
                  href={'https://www.instagram.com/plynthplayer/'}
                  target="_blank"
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
                >
                  <FontAwesomeIcon
                    icon={faTiktok}
                    color="white"
                    size="lg"
                    fontSize="24px"
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  )
}

export default OnTheWaitlist
