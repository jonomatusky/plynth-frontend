import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  useMediaQuery,
  Link,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { HashLink } from 'react-router-hash-link'

import Emoji from 'components/Emoji'
import WebsiteNavBar from 'components/WebsiteNavBar'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Div100vh from 'components/Div100vh'
import { ArrowBack, ArrowForward, CameraAlt } from '@material-ui/icons'
import ReactPlayer from 'react-player'
import HubspotForm from 'react-hubspot-form'
import theme from 'theme'

const SmoothHashLink = React.forwardRef((props, ref) => (
  <HashLink smooth innerRef={ref} {...props} />
))

const Home = () => {
  const videoViewWidth =
    25 +
    useMediaQuery(theme.breakpoints.down('md')) * 20 +
    useMediaQuery(theme.breakpoints.down('sm')) * 40

  return (
    <>
      <ScrollToTopOnMount />
      <Grid item xs={12}>
        <WebsiteNavBar />
      </Grid>
      <Div100vh
        style={{
          backgroundColor: '#000000',
        }}
      >
        <Box
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} container justifyContent="center">
              <Typography variant="h6" color="white">
                Take a photo to access your content
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Button
                component={RouterLink}
                color="secondary"
                to="/pickup"
                endIcon={<CameraAlt fontSize="large" sx={{ color: 'white' }} />}
                size="large"
                sx={{
                  borderBottom: '2px solid black',
                  borderRadius: '0px',
                  ':hover': { borderBottom: '2px solid white' },
                  ':focus': { borderBottom: '2px solid white' },
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  <b>Open Camera</b>
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box
          position="absolute"
          bottom="0"
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <Button
            component={SmoothHashLink}
            to="#about"
            style={{ textTransform: 'none' }}
            disableRipple
          >
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={12} container justifyContent="center">
                <Typography variant="h6" style={{ opacity: 0.8 }} color="white">
                  learn more
                </Typography>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <ExpandMoreIcon
                  style={{ padding: 0, opacity: 0.8, color: 'white' }}
                />
              </Grid>
            </Grid>
          </Button>
        </Box>
      </Div100vh>

      <Container maxWidth={false} id="about">
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Box height="4rem" mt={4} />
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Grid item xs={9} container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Box color="white" pb={2}>
                  <Typography variant="h3" letterSpacing={1}>
                    <b>Connect Physical and Digital</b>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb="1em">
                  <Typography color="white" variant="h5">
                    Link your content to any piece of artwork. Fans snap a photo
                    to access.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb="1em">
                  <Typography variant="h6" color="white">
                    <Emoji symbol="🤝" label="headphones" /> Bundle physical and
                    digital
                  </Typography>
                </Box>
                <Box mb="1em">
                  <Typography variant="h6" color="white">
                    <Emoji symbol="✨" label="handshake" /> Tell an interactive
                    story
                  </Typography>
                </Box>
                <Box mb="1em">
                  <Typography variant="h6" color="white">
                    <Emoji symbol="🔮" label="crystal-ball" /> Add meaning to
                    your merch
                  </Typography>
                </Box>
                <Box mb="1em">
                  <Typography variant="h6" color="white">
                    <Emoji symbol="🏷" label="cd" /> Encourage repeat purchases
                  </Typography>
                </Box>
                <Box mb="1em">
                  <Typography variant="h6" color="white">
                    <Emoji symbol="💨" label="cd" /> No Download Required
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb="1em" color="white">
                  <Typography variant="h6">
                    <b>Become a member of our private beta.</b>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} container justifyContent="center">
                <Button
                  component={RouterLink}
                  color="secondary"
                  to="/s/waitlist"
                  startIcon={<ArrowForward sx={{ color: 'white' }} />}
                  endIcon={<ArrowBack sx={{ color: 'white' }} />}
                  size="large"
                >
                  <Typography
                    sx={{
                      color: 'white',
                      textDecoration: 'underline',
                      ':hover': { textDecoration: 'none' },
                    }}
                    variant="h6"
                  >
                    <b>Join the Waitlist</b>
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box pb={10} />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Box
              width={`${videoViewWidth}vw`}
              height={`${1.8 * videoViewWidth}vw`}
            >
              <ReactPlayer
                url="https://www.youtube.com/watch?v=Q6QvQvZsJJU"
                height="100%"
                width="100%"
                overflow="hidden"
                playsinline={true}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box pt={10} pb={2}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item md={3} sm={5} xs={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box pb={2}>
                        <Typography variant="h5" color="white">
                          <b>Get the latest updates</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <HubspotForm
                        portalId="5609139"
                        formId="522ea516-b5f4-49f4-8285-a61ad49fd705"
                        loading={
                          <Typography variant="h5" color="white">
                            <b>Thanks, you're subscribed!</b>
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              spacing={2}
            >
              <Grid item xs={7} container justifyContent="center">
                <Typography color="white">
                  <Link component={RouterLink} to="/s/contact" color="inherit">
                    Contact Us
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={7} container justifyContent="center">
                <Box height="1rem" />
                <Typography variant="body2" color="white">
                  Copyright © 2021 Plynth
                </Typography>
                <Box height="1rem" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
