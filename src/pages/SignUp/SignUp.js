import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Box,
  Container,
  Button,
  Paper,
  Typography,
  Fade,
} from '@mui/material'
import {
  Launch,
  Link as LinkIcon,
  People,
  PhoneIphone,
  QrCode2,
  VideoCameraBack,
} from '@mui/icons-material'

import CreateAccountDialog from './components/CreateAccountDialog'
import MediaBlock from 'components/MediaBlock'
import PublicNav from 'layouts/PublicNav'

const { REACT_APP_ASSET_URL } = process.env
const demoVideoName = 'astronaut-ar-trimmed.mp4'
const videoSrc = REACT_APP_ASSET_URL + '/' + demoVideoName
const demoImageName = 'Postcard+Mixtape+Vol+1+600px.jpg'
const imageSrc = REACT_APP_ASSET_URL + '/' + demoImageName
const imageWidth = 600
const imageHeight = 900

const SignUp = () => {
  const DisplayCard = () => {
    const [hideImage, setHideImage] = useState(true)

    const playerRef = useRef()

    useEffect(() => {
      if (hideImage) {
        const timeout = setTimeout(() => {
          if (playerRef.current) {
            try {
              playerRef.current.currentTime = 0
              var playPromise = playerRef.current.play()

              if (playPromise !== undefined) {
                playPromise
                  .then(_ => {
                    // Automatic playback started!
                    // Show playing UI.
                  })
                  .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                  })
              }
            } catch (err) {}
          }
          setHideImage(false)
        }, 4000)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => {
          setHideImage(true)
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }, [hideImage])

    return (
      <Box
        backgroundColor="white"
        border="2px solid #ddd"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={6}
        sx={{
          transform: 'rotate(3deg)',
          width: { xs: '350px', lg: '450px' },
          height: {
            xs: imageSrc ? (imageHeight / imageWidth) * 350 + 'px' : '525px',
            lg: imageSrc ? (imageHeight / imageWidth) * 450 + 'px' : '675px',
          },
        }}
        mr={2}
        boxShadow="5px 5px 15px #00000040"
        position="relative"
      >
        {!imageSrc && !videoSrc && (
          <Box color="#dddddd" textAlign="center">
            <VideoCameraBack color="inherit" sx={{ fontSize: 100 }} />
            <Typography>
              <b>Your Image + Video Here</b>
            </Typography>
          </Box>
        )}
        {imageSrc && (
          <Fade
            // appear={false}
            timeout={{ enter: 0, exit: 1000 }}
            in={!hideImage}
          >
            <img
              src={imageSrc}
              width="100%"
              height="100%"
              alt="preview"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            />
          </Fade>
        )}
        {videoSrc && (
          <video
            src={videoSrc}
            ref={playerRef}
            autoPlay
            muted
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
    )
  }

  return (
    <>
      {/* <BarEditPiece /> */}
      <CreateAccountDialog open={true} />
      {/* <PublicNav hideFooter hideNavBar backgroundColor="#fafafa"> */}
      <Box
        position="aboslute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        zIndex={10}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>
      <Box
        height="calc(100vh)"
        width="100%"
        overflow="auto"
        display="flex"
        alignContent="center"
        pt={3}
      >
        <Container disableGutters maxWidth="lg">
          <Grid
            container
            justifyContent="flex-start"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Grid item sm={12} md={7} container justifyContent="center">
              <Grid item xs={11} lg={9}>
                <Box margin={4}>
                  <Paper>
                    <Box padding={4} pb={3}>
                      <Box
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                        width="100%"
                        flexWrap="wrap"
                      >
                        <Box
                          width="100%"
                          display="flex"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <MediaBlock mediaType="image" imageSrc={imageSrc} />
                          <LinkIcon fontSize="large" color="secondary" />
                          <MediaBlock mediaType="video" videoSrc={videoSrc} />
                        </Box>
                        <Box width="320px" mt={4} mb={4}>
                          <Button
                            variant="contained"
                            fullWidth
                            disabled={!imageSrc || !videoSrc}
                          >
                            <b>{`Create & Save`}</b>
                          </Button>
                        </Box>
                        <Box width="100%" display="flex" color="#cccccc">
                          <Box flexGrow={1} display="flex" flexWrap="wrap">
                            <Box
                              flexGrow={1}
                              display="flex"
                              alignItems="flex-start"
                            >
                              <Box
                                minWidth="60px"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                                pt="6px"
                              >
                                <PhoneIphone
                                  sx={{ fontSize: 60 }}
                                  color="inherit"
                                />
                              </Box>
                              <Box flexGrow={1}>
                                <Typography variant="h5" color="inherit">
                                  <b>Try it out</b>
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                  Scan the QR code and hold your phone up to the
                                  image to the right or the physical item.
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              flexGrow={1}
                              display="flex"
                              alignItems="flex-start"
                              mt={1}
                            >
                              <Box
                                minWidth="60px"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                              >
                                <People sx={{ fontSize: 40 }} color="inherit" />
                              </Box>
                              <Box flexGrow={1}>
                                <Typography variant="h6" color="inherit">
                                  Share with a friend
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                  Send a link to the preview page so they can
                                  try it out themselves.
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              flexGrow={1}
                              display="flex"
                              alignItems="flex-start"
                              mt={1}
                            >
                              <Box
                                minWidth="52px"
                                textAlign="center"
                                display="flex"
                                justifyContent="center"
                              ></Box>
                              <Box flexGrow={1}>
                                <Typography>
                                  <Button
                                    sx={{ textTransform: 'none' }}
                                    endIcon={<Launch />}
                                    color="inherit"
                                    component={Link}
                                    to={'#'}
                                    disabled
                                  >
                                    View Preview Page
                                  </Button>
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            <Box width="144px" height="144px">
                              <QrCode2 sx={{ fontSize: 144 }} />
                            </Box>
                          </Box>
                        </Box>
                        <Box width="320px" mt={3} mb={1}>
                          <Button variant="contained" fullWidth disabled>
                            <b>Download Print Files</b>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <DisplayCard />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* </PublicNav> */}
    </>
  )
}

export default SignUp
