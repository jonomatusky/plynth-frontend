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
  Phone,
  PhoneIphone,
  QrCode2,
  VideoCameraBack,
} from '@mui/icons-material'
import ReactPlayer from 'react-player'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'

import BarEditPiece from 'layouts/BarEditPiece'
import AddMediaButton from 'components/AddMediaButton'
import CreateAccountDialog from './components/CreateAccountDialog'
import { useSession } from 'hooks/use-session'

const CreatePiece = () => {
  const [media, setMedia] = useState({
    imageFile: null,
    imageSrc: null,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    videoFile: null,
    videoSrc: null,
    videoUrl: null,
  })
  const { user } = useSession()

  const { imageFile, imageSrc, imageWidth, imageHeight, videoFile, videoSrc } =
    media

  console.log(media)

  const {
    selectPack,
    updatePack: updateReduxPack,
    status,
    updateStatus,
  } = usePackStore()

  const card = {}

  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState(false)

  // const updatePack = updatedPack => {
  //   setPack({ ...pack, ...updatedPack })
  //   updateReduxPack(updatedPack)
  // }

  // const handleCardSubmit = values => {
  //   if (status !== 'loading') {
  //     let updatedCards = [...pack.cards]
  //     updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...values }
  //     updateReduxPack({ id: pieceId, cards: updatedCards })
  //   }
  // }

  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const setSpinning = () => {
      setIsSpinning(true)
    }
    const stopSpinning = () => {
      setTimeout(() => {
        if (isSpinning === true) {
          setIsSpinning(false)
        }
      }, 500)
    }
    if (updateStatus === 'loading') {
      setSpinning()
    } else {
      stopSpinning()
    }
  }, [updateStatus, isSpinning])

  const handleRemoveClose = () => {
    setRemoveDialogIsOpen(false)
  }

  const handleRemoveOpen = () => {
    setRemoveDialogIsOpen(true)
  }

  const handleUpdateMedia = newMedia => {
    setMedia({ ...media, ...newMedia })
  }

  console.log('reloading')

  // const cardWidth =

  const DisplayCard = () => {
    const [hideImage, setHideImage] = useState(true)

    const playerRef = useRef()

    useEffect(() => {
      if (hideImage) {
        const timeout = setTimeout(() => {
          if (playerRef.current) {
            playerRef.current.currentTime = 0
            playerRef.current.play()
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

  const [signUpDialogIsOpen, setSignUpDialogIsOpen] = useState(true)

  const submitPiece = () => {
    return
  }

  const createPiece = () => {
    if (!!user) {
      submitPiece()
    } else {
      setSignUpDialogIsOpen(true)
    }
  }

  return (
    <>
      <BarEditPiece />
      <CreateAccountDialog
        open={signUpDialogIsOpen}
        onClose={() => setSignUpDialogIsOpen(false)}
      />
      <AdminNav>
        <Box
          height="calc(100vh - 48px)"
          width="100%"
          overflow="auto"
          display="flex"
          alignContent="center"
        >
          <Container disableGutters maxWidth="lg">
            <Grid container justifyContent="flex-start">
              <Grid item sm={12} md={7} container justifyContent="center">
                <Grid item xs={11} lg={9}>
                  <Box margin={4}>
                    <Paper>
                      <Box padding={4} pb={1}>
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
                            <AddMediaButton
                              mediaType="image"
                              updateMedia={handleUpdateMedia}
                              {...media}
                            />
                            <LinkIcon fontSize="large" color="secondary" />
                            <AddMediaButton
                              mediaType="video"
                              updateMedia={handleUpdateMedia}
                              {...media}
                            />
                          </Box>
                          <Box width="320px" mt={4} mb={4}>
                            <Button
                              variant="contained"
                              fullWidth
                              disabled={!imageSrc || !videoSrc}
                              onClick={createPiece}
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
                                    Scan the QR code and hold your phone up to
                                    the image to the right or the physical item.
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
                                  <People
                                    sx={{ fontSize: 40 }}
                                    color="inherit"
                                  />
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
                          <Box mb={1} color="#cccccc">
                            <Typography variant="caption">
                              Need help printing? Check out our list of{' '}
                              <u>local and national printers</u>
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
              <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
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
      </AdminNav>
      {/* <Dialog
        onClose={handleRemoveClose}
        aria-labelledby="remove-dialog-title"
        open={removeDialogIsOpen}
      >
        <DialogTitle id="remove-dialog-title">Remove Card</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this card? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleRemoveClose}>Cancel</MuiButton>
          <MuiButton onClick={handleDeleteCard}>Remove</MuiButton>
        </DialogActions>
      </Dialog> */}
    </>
  )
}

export default CreatePiece
