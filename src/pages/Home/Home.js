import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Grid, Typography, Container, Box, Button } from '@mui/material'
// import { HashLink } from 'react-router-hash-link'

import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import {
  ArrowForward,
  QrCodeScanner,
  Videocam,
  Image as ImageIcon,
  // Portrait,
} from '@mui/icons-material'
import ReactPlayer from 'react-player'
import Phone from 'components/Phone'
import contentful from 'config/contentful'
import PublicNav from 'layouts/PublicNav'
import Image from 'components/Image'
// import FormWaitlist from 'components/FormWaitlist'
import VideoPoster from 'images/video-poster.jpeg'

// const SmoothHashLink = React.forwardRef((props, ref) => (
//   <HashLink smooth innerRef={ref} {...props} />
// ))

const Home = () => {
  const { search } = useLocation()
  const history = useHistory()
  const [highlights, setHighlights] = useState([])
  const [content, setContent] = useState({})
  // const [videoIsReady, setVideoIsReady] = useState(false)

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  useEffect(() => {
    const getContent = async () => {
      try {
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
      } catch (err) {}
    }

    getContent()
  }, [])

  return (
    <>
      <PublicNav>
        <ScrollToTopOnMount />

        <Container maxWidth="lg" id="about" disableGutters>
          <Grid container justifyContent="center">
            <Grid
              item
              xs={12}
              md={2}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
            <Grid item xs={11} sm={7} md={4}>
              <Grid
                container
                sx={{ height: '100%' }}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={11} mt={6}>
                  <Typography
                    variant="h3"
                    letterSpacing={1}
                    style={{ fontWeight: 800 }}
                    pb={3}
                  >
                    {content.heading}
                  </Typography>
                  <Typography
                    variant="h6"
                    pb={3}
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {content.subheading}
                  </Typography>
                  <Box width="100%" maxWidth="350px">
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ height: '51.5px' }}
                      endIcon={<ArrowForward />}
                      component={Link}
                      to="/signup"
                    >
                      <Typography letterSpacing={1} style={{ fontWeight: 900 }}>
                        Start Creating
                      </Typography>
                    </Button>
                    {/* <FormWaitlist /> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={4}
              sm={5}
              md={5}
              container
              justifyContent="center"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <Grid item xs={12}>
                <Box mt={12} />
              </Grid>
              <Phone>
                <Box
                  height="100%"
                  width="100%"
                  // display={videoIsReady ? null : 'none'}
                  // bgcolor="#999999"
                  sx={{
                    backgroundImage: `url(${VideoPoster})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
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
                    // onReady={() => setVideoIsReady(true)}
                  />
                </Box>

                {/* {!videoIsReady && (
                  <Box backgroundColor="#999999" height="100%" width="100%" />
                )} */}
              </Phone>
            </Grid>
            <Grid
              item
              xs={12}
              md={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
            <Grid
              item
              xs={12}
              pb={2}
              sx={{ display: { xs: 'none', ld: 'block' } }}
            >
              <Box mb={10} />
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
                  url={content.videoUrl}
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

            {/* How it works */}

            <Grid item xs={12}>
              <Typography
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
            {!!content.howSubheading && (
              <Grid item container xs={12} justifyContent="center" mb={2}>
                <Grid item xs={10} sm={9} md={7} lg={5} pb={2}>
                  <Typography letterSpacing={1} textAlign="center">
                    {content.howSubheading}
                  </Typography>
                </Grid>
              </Grid>
            )}

            <Grid
              item
              container
              xs={8}
              justifyContent="center"
              mb={2}
              alignItems="top"
            >
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <Grid item xs={12} textAlign="center">
                  <Videocam sx={{ fontSize: '80px' }} color="primary" />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Typography textAlign="center" mt={1}>
                    {content.step1}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="center"
                alignItems="center"
                sx={{ display: { xs: 'none', xl: 'flex' } }}
              >
                <ArrowForward sx={{ fontSize: '36px' }} />
              </Grid>
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <Grid item xs={12} textAlign="center">
                  <ImageIcon sx={{ fontSize: '80px' }} color="primary" />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Typography textAlign="center" mt={1}>
                    {content.step2}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="center"
                alignItems="center"
                sx={{ display: { xs: 'none', xl: 'flex' } }}
              >
                <ArrowForward sx={{ fontSize: '36px' }} />
              </Grid>
              <Grid item xs={8} md={3} container justifyContent="center" mb={2}>
                <Grid item xs={12} textAlign="center">
                  <QrCodeScanner sx={{ fontSize: '80px' }} color="primary" />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Typography textAlign="center" mt={1}>
                    {content.step3}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Creator Section */}
            <Grid item xs={12} pb={2}>
              <Box mb={6} sx={{ display: { xs: 'none', lg: 'block' } }} />
            </Grid>
            <Grid item xs={12} mt={10} pb={2}>
              <Typography
                variant="h5"
                letterSpacing={1}
                style={{ fontWeight: 800 }}
                textAlign="center"
              >
                {content.creatorHeading}
              </Typography>
            </Grid>
            {!!content.creatorSubheading && (
              <Grid item xs={10} sm={8} md={6} lg={4} pb={2}>
                <Typography letterSpacing={1} textAlign="center">
                  {content.creatorSubheading}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} mt={3} pb={2} container justifyContent="center">
              <Box
                height="100%"
                overflow="auto"
                display="flex"
                justifyContent="flex-start"
                sx={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
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
                      <Box width="125px" ml="auto" mr="auto">
                        <Image
                          height="125px"
                          width="125px"
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                          src={
                            highlight.fields.image
                              ? 'https:' +
                                highlight.fields.image.fields.file.url
                              : null
                          }
                          alt={highlight.fields.title}
                        />
                      </Box>

                      <Typography textAlign="center">
                        <b>{highlight.fields.title}</b>
                      </Typography>
                      <Typography variant="body2" textAlign="center">
                        {highlight.fields.text}
                      </Typography>
                    </Box>
                  )
                })}
                <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                  <Box ml={2}></Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              container
              justifyContent="flex-end"
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <ArrowForward />
            </Grid>

            <Grid
              item
              xs={12}
              pb={2}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Box mt={8} />
            </Grid>

            {/* Use it for... Section */}
            <Grid item xs={12} container spacing={2} justifyContent="center">
              <Grid item xs={10} sm={6} md={6}>
                <Box pb={2} textAlign="center">
                  <Typography variant="h4" letterSpacing={1}>
                    <b>{content.useHeading}</b>
                  </Typography>
                </Box>
                {(content.uses || []).map((use, index) => {
                  return (
                    <Box mb="1em" key={index}>
                      <Typography variant="h6">{use}</Typography>
                    </Box>
                  )
                })}
              </Grid>
            </Grid>

            <Grid item xs={12} mt={8}>
              <Box pt={8} pb={8}>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item lg={3} md={4} sm={6} xs={10}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} pb={2}>
                        <Typography variant="h6" textAlign="center">
                          {content.ctaBottom}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} container justifyContent="center">
                        <Box maxWidth="350px">
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ height: '51.5px' }}
                            endIcon={<ArrowForward />}
                            component={Link}
                            to="/signup"
                          >
                            <Typography
                              letterSpacing={1}
                              style={{ fontWeight: 900 }}
                            >
                              Start Creating
                            </Typography>
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              pb={2}
              sx={{ display: { xs: 'none', lg: 'block' } }}
            >
              <Box mt={2} />
            </Grid>
          </Grid>
        </Container>
      </PublicNav>
    </>
  )
}

export default Home
