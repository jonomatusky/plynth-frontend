import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Box,
  Button,
  Hidden,
} from '@material-ui/core'
// import { HashLink } from 'react-router-hash-link'

import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import {
  ArrowForward,
  CameraAltOutlined,
  MeetingRoom,
  PhotoAlbumOutlined,
  // Portrait,
} from '@material-ui/icons'
import ReactPlayer from 'react-player'
import Phone from 'components/Phone'
import TextFieldWebsite from 'components/TextFieldWebsite'
import contentful from 'config/contentful'
import PublicNav from 'layouts/PublicNav'
import FormSubscribe from 'components/FormSubscribe'

// const SmoothHashLink = React.forwardRef((props, ref) => (
//   <HashLink smooth innerRef={ref} {...props} />
// ))

const Home = () => {
  const { search } = useLocation()
  const history = useHistory()
  const [highlights, setHighlights] = useState([])
  const [content, setContent] = useState({})
  const [videoIsReady, setVideoIsReady] = useState(false)

  const [username, setUsername] = useState('')

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  const handleChange = event => {
    setUsername(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    history.push(`/register?username=${encodeURI(username)}`)
  }

  useEffect(() => {
    const getContent = async () => {
      const contentResponse = await contentful.getEntry(
        '6QV9CsiiyC8H7rti3qAmqd'
      )
      const highlightsResponse = await contentful.getEntries({
        content_type: 'userHighlight',
        'fields.active': true,
        order: 'fields.order',
      })

      setContent(contentResponse.fields)
      setHighlights(highlightsResponse.items)
    }

    getContent()
  }, [])

  return (
    <PublicNav>
      <ScrollToTopOnMount />

      <Container maxWidth={false} id="about" disableGutters>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={2} />
          <Grid item xs={12} md={4}>
            <Grid
              container
              sx={{ height: '100%' }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={11} mt={6}>
                <Typography
                  color="white"
                  variant="h3"
                  letterSpacing={1}
                  style={{ fontWeight: 800 }}
                  pb={3}
                >
                  {content.heading}
                </Typography>
                <Typography color="white" variant="h5" pb={3}>
                  {content.subheading}
                </Typography>
                <Button
                  component={RouterLink}
                  to={'/register'}
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                >
                  <b>Get Early Access</b>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} container justifyContent="center">
            <Grid item xs={12}>
              <Box mt={12} />
            </Grid>
            <Phone>
              <Box
                height="100%"
                width="100%"
                display={videoIsReady ? null : 'none'}
              >
                <ReactPlayer
                  url={content.videoUrl}
                  height="100%"
                  width="100%"
                  overflow="hidden"
                  playsinline={true}
                  loop={true}
                  playing={true}
                  config={{ vimeo: { playerOptions: { background: 1 } } }}
                  onReady={() => setVideoIsReady(true)}
                />
              </Box>

              {!videoIsReady && (
                <Box backgroundColor="#999999" height="100%" width="100%" />
              )}
            </Phone>
          </Grid>
          <Grid item xs={12} md={1} />

          <Grid item md={10} xs={11}>
            <Grid container justifyContent="center" alignItems="top">
              <Hidden smDown>
                <Grid item xs={12} pb={2}>
                  <Box mb={20} />
                </Grid>
              </Hidden>
              <Grid item xs={12}>
                <Typography
                  color="white"
                  variant="h4"
                  letterSpacing={1}
                  style={{ fontWeight: 800 }}
                  pb={3}
                  mt={10}
                  textAlign="center"
                >
                  {content.howHeading}
                </Typography>
              </Grid>
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <PhotoAlbumOutlined sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  {content.step1}
                </Typography>
              </Grid>
              <Hidden mdDown>
                <Grid
                  item
                  xs={1}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowForward sx={{ color: 'white', fontSize: '36px' }} />
                </Grid>
              </Hidden>
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <MeetingRoom sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  {content.step2}
                </Typography>
              </Grid>
              <Hidden mdDown>
                <Grid
                  item
                  xs={1}
                  container
                  justifyContent="center"
                  alignItems="center"
                >
                  <ArrowForward sx={{ color: 'white', fontSize: '36px' }} />
                </Grid>
              </Hidden>
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <CameraAltOutlined sx={{ color: 'white', fontSize: '80px' }} />
                <Typography color="white" textAlign="center" mt={1}>
                  {content.step3}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} pb={2}>
            <Hidden smDown>
              <Box mb={20} />
            </Hidden>
          </Grid>
          <Grid item xs={12} container justifyContent="center" mt={12}>
            <Grid item>
              <MeetingRoom sx={{ color: 'white', fontSize: '80px' }} />
            </Grid>
            <Grid item xs={12} pb={2}>
              <Typography
                color="white"
                variant="h5"
                letterSpacing={1}
                style={{ fontWeight: 800 }}
                textAlign="center"
              >
                {content.claimHeading}
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} pb={2}>
              <Typography
                color="white"
                letterSpacing={1}
                pb={3}
                textAlign="center"
              >
                {content.claimSubheading}
              </Typography>
            </Grid>
            <Grid item md={10} container justifyContent="center">
              <form onSubmit={handleSubmit}>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  flexWrap="wrap"
                  p={1}
                >
                  <Box maxWidth="450px" flexShrink={1} m={1}>
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
                  <Box flexGrow={1} maxWidth="450px" m={1}>
                    <Button
                      type="submit"
                      variant="contained"
                      endIcon={<ArrowForward />}
                      size="large"
                      fullWidth
                      sx={{ height: '68px' }}
                    >
                      <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                        Claim My Portal
                      </Typography>
                    </Button>
                  </Box>
                  {/* <Hidden smUp>
                    <Box flexGrow={1} mt={2} width="250px">
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<ArrowForward />}
                        size="large"
                        fullWidth
                        sx={{ height: '68px' }}
                      >
                        <Typography
                          letterSpacing={1}
                          style={{ fontWeight: 800 }}
                        >
                          Claim My Portal
                        </Typography>
                      </Button>
                    </Box>
                  </Hidden> */}
                </Box>
              </form>
            </Grid>
          </Grid>

          {/* Creator Section */}
          <Grid item xs={12} pb={2}>
            <Hidden smDown>
              <Box mb={20} />
            </Hidden>
          </Grid>
          <Grid item xs={12} mt={10} pb={2}>
            <Typography
              color="white"
              variant="h4"
              letterSpacing={1}
              style={{ fontWeight: 800 }}
              textAlign="center"
            >
              {content.creatorHeading}
            </Typography>
          </Grid>
          <Grid item xs={12} mt={6} pb={2} container justifyContent="center">
            <Box maxWidth="100%" overflow="scroll">
              <Box display="flex">
                {highlights.map((highlight, index) => {
                  return (
                    <Box
                      key={highlight.sys.id}
                      width="150px"
                      textAlign="center"
                      mt={index % 2 === 1 ? 6 : 0}
                      mr={3}
                      ml={3}
                    >
                      <img
                        style={{
                          height: '125px',
                          width: '125px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                        src={'https:' + highlight.fields.image.fields.file.url}
                        alt={highlight.fields.title}
                      />
                      <Typography textAlign="center" color="white">
                        <b>{highlight.fields.title}</b>
                      </Typography>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="white"
                      >
                        {highlight.fields.text}
                      </Typography>
                    </Box>
                  )
                })}
                <Hidden smUp>
                  <Box>
                    <Box ml={2}></Box>
                  </Box>
                </Hidden>
              </Box>
            </Box>
          </Grid>
          <Hidden smUp>
            <Grid item xs={12} pb={2} container justifyContent="flex-end">
              <ArrowForward sx={{ color: 'white' }} />
            </Grid>
          </Hidden>

          <Hidden smDown>
            <Grid item xs={12} pb={2}>
              <Box mb={20} />
            </Grid>
          </Hidden>

          <Grid item xs={12} container justifyContent="center">
            <Grid item xs={12} md={5} container justifyContent="center" mt={8}>
              <Grid item xs={11} container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Box color="white" pb={2}>
                    <Typography variant="h4" letterSpacing={1}>
                      <b>{content.useHeading}</b>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  {(content.uses || []).map((use, index) => {
                    return (
                      <Box mb="1em" key={index}>
                        <Typography variant="h6" color="white">
                          {use}
                        </Typography>
                      </Box>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid
              item
              xs={12}
              md={4}
              mt={8}
              container
              justifyContent="center"
              alignContent="center"
              spacing={1}
            >
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center" color="white">
                  <b>Try It Out</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  textAlign="center"
                  color="white"
                  variant="h6"
                  mb={2}
                >
                  Sign up for early access
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  component={RouterLink}
                  to={'/register'}
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                  sx={{ height: '48px' }}
                >
                  <b>Get Early Access</b>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item xs={12} pb={2}>
              <Box mt={20} />
            </Grid>
          </Hidden>
          <Grid item xs={12} mt={8}>
            <Box pt={8} pb={8}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item lg={3} md={4} sm={6} xs={10}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box pb={2}>
                        <Typography
                          variant="h5"
                          color="white"
                          textAlign="center"
                        >
                          <b>Sign up for updates</b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <FormSubscribe />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PublicNav>
  )
}

export default Home
