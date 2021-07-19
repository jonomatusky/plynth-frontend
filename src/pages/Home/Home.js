import React, { useState } from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  useMediaQuery,
  Link,
  Hidden,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { HashLink } from 'react-router-hash-link'

import Emoji from 'components/Emoji'
import WebsiteNavBar from 'components/WebsiteNavBar'
import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import Div100vh from 'components/Div100vh'
import {
  ArrowBack,
  ArrowForward,
  CameraAlt,
  CameraAltOutlined,
  CropOriginal,
  PhotoAlbum,
  PhotoAlbumOutlined,
  Portrait,
} from '@material-ui/icons'
import ReactPlayer from 'react-player'
import HubspotForm from 'react-hubspot-form'
import theme from 'theme'
import Phone from 'components/Phone'
import button from 'components/Button'
import TextFieldWebsite from 'components/TextFieldWebsite'

const SmoothHashLink = React.forwardRef((props, ref) => (
  <HashLink smooth innerRef={ref} {...props} />
))

const Home = () => {
  const { search } = useLocation()
  const history = useHistory()

  const [username, setUsername] = useState('')

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  const handleChange = event => {
    setUsername(encodeURI(event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    history.push(`/s/new-portal?username=${username}`)
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Grid item xs={12}>
        <WebsiteNavBar />
      </Grid>

      <Container maxWidth={false} id="about">
        <Grid container>
          <Grid item xs={12}>
            <Box height="4rem" mt={4} />
          </Grid>
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={5}>
            <Grid
              container
              sx={{ height: '100%' }}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <Typography
                  color="white"
                  variant="h3"
                  letterSpacing={1}
                  style={{ fontWeight: 800 }}
                  pb={3}
                >
                  Connect Physical and Digital
                </Typography>
                <Typography color="white" variant="h5" pb={3}>
                  Link physical artwork to digital content. It’s a QR code
                  without the QR code.
                </Typography>
                <Button
                  component={RouterLink}
                  to={'/s/new-portal'}
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                >
                  Get Early Access
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Phone>
              <ReactPlayer
                url="https://vimeo.com/575488337"
                height="100%"
                width="100%"
                overflow="hidden"
                playsinline={true}
                loop={true}
                playing={true}
                config={{ vimeo: { playerOptions: { background: 1 } } }}
              />
            </Phone>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="top">
              <Grid item xs={12} pb={2}>
                <Hidden smDown>
                  <Box height="200px" />
                </Hidden>
              </Grid>
              <Grid item xs={12} pb={2}>
                <Typography
                  color="white"
                  variant="h4"
                  letterSpacing={1}
                  style={{ fontWeight: 800 }}
                  pb={3}
                  mt={2}
                  textAlign="center"
                >
                  How it works
                </Typography>
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <Portrait sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  Claim your portal at plynth.com/yourname
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="center"
                alignItems="center"
              >
                <ArrowForward sx={{ color: 'white', fontSize: '36px' }} />
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <PhotoAlbumOutlined sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  Add images link them to your content
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="center"
                alignItems="center"
              >
                <ArrowForward sx={{ color: 'white', fontSize: '36px' }} />
              </Grid>
              <Grid item xs={2} container justifyContent="center">
                <CameraAltOutlined sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  Fans visit your portal to snap a photo and access your content
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Grid item xs={12} pb={2}>
              <Hidden smDown>
                <Box height="200px" />
              </Hidden>
            </Grid>
            <Grid item xs={12} pb={2}>
              <Typography
                color="white"
                variant="h4"
                letterSpacing={1}
                style={{ fontWeight: 800 }}
                textAlign="center"
              >
                Claim Your Portal
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} pb={2}>
              <Typography
                color="white"
                letterSpacing={1}
                pb={3}
                textAlign="center"
              >
                Fans visit your portal to snap a photo and unlock your content.
              </Typography>
            </Grid>
            <Grid item md={8} container justifyContent="center">
              <form onSubmit={handleSubmit}>
                <Box display="flex" justifyContent="center">
                  <Box mr={1}>
                    <TextFieldWebsite
                      variant="outlined"
                      placeholder="yourname"
                      size="medium"
                      fullWidth
                      InputProps={{
                        startAdornment: 'plynth.com/',
                      }}
                      onChange={handleChange}
                      value={username}
                    />
                  </Box>
                  <Box flexGrow={1}>
                    <Button
                      type="submit"
                      // component={RouterLink}
                      // to={`/s/new-portal?username=${username}`}
                      variant="contained"
                      endIcon={<ArrowForward />}
                      size="large"
                      sx={{ height: '68px', width: '250px' }}
                    >
                      <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                        Claim My Portal
                      </Typography>
                    </Button>
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Grid item xs={12} pb={2}>
            <Hidden smDown>
              <Box height="200px" />
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Box height="4rem" mt={4} />
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Grid item xs={11} container spacing={2} justifyContent="center">
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
          <Grid item xs={12} md={6} container justifyContent="center"></Grid>

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
                    <b>Contact Us</b>
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={7} container justifyContent="center">
                <Box pt={1} pb={1}>
                  <Typography variant="body2" color="gray">
                    Copyright © Plynth 2021
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
