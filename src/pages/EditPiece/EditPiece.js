import React, { useEffect, useRef, useState } from 'react'
import 'mind-ar/dist/mindar-image.prod.js'
import { Link, useParams } from 'react-router-dom'
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
  AutoFixHigh,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import QRCode from 'qrcode.react'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'

import BarEditPiece from 'layouts/BarEditPiece'
import AddMediaButton from './components/AddMediaButton'
import WelcomeDialog from './components/WelcomeDialog'
import { useSession } from 'hooks/use-session'
import { useRequest } from 'hooks/use-request'
import { useAlertStore } from 'hooks/store/use-alert-store'
import axios from 'axios'
import { loadImgAsync } from 'util/imageHandling'

const { REACT_APP_ASSET_URL, REACT_APP_PUBLIC_URL } = process.env

const CreatePiece = () => {
  const { user } = useSession()

  const { selectPack, packs, updatePack, status, updateStatus } = usePackStore()

  const { pieceId } = useParams()
  const experiencePage = REACT_APP_PUBLIC_URL + '/p/' + pieceId

  const pack = selectPack(pieceId)

  const cards = (pack || {}).cards
  const media = (cards || [{}])[0]

  const { setError } = useAlertStore()

  const { image, imageHeight, imageWidth, video, videoDuration, targets } =
    media

  let imageSrc = image ? REACT_APP_ASSET_URL + '/' + image : null
  let videoSrc = video ? REACT_APP_ASSET_URL + '/' + video : null

  // useEffect(() => {
  //   const onPackChange = () => {
  //     const cards = (pack || {}).cards
  //     const card = (cards || [])[0]
  //     const newMedia = card || {}
  //     setMedia(newMedia)
  //   }
  //   onPackChange()
  // }, [pack])

  const handleUpdateMedia = newMedia => {
    console.log({ id: pieceId, cards: [{ ...media, ...newMedia }] })
    updatePack({ id: pieceId, cards: [{ ...media, ...newMedia }] })
  }

  // const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState(false)

  // const handleRemoveClose = () => {
  //   setRemoveDialogIsOpen(false)
  // }

  // const handleRemoveOpen = () => {
  //   setRemoveDialogIsOpen(true)
  // }

  const DisplayCard = () => {
    const [hideImage, setHideImage] = useState(!!video)
    const [hideVideo, setHideVideo] = useState(!!targets)

    const playerRef = useRef()

    useEffect(() => {
      if (video && image && !targets) {
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
      } else {
        setHideImage(false)
        setHideVideo(true)
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
        {videoSrc && !hideVideo && (
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

  const [welcomeDialogIsOpen, setWelcomeDialogIsOpen] = useState(
    packs.length === 1 && !imageSrc && !videoSrc
  )

  const [isLoading, setIsLoading] = useState(false)
  const [percent, setPercent] = useState(0)

  const { request } = useRequest()

  const getImageTargets = async () => {
    setIsLoading(true)

    try {
      console.log(imageSrc)

      console.log('creating')

      const response = await axios.request({
        url: imageSrc,
        responseType: 'blob',
      })

      console.log(response)

      console.log('got image response')
      const blob = response.data
      const src = await URL.createObjectURL(blob)

      let img = await loadImgAsync(src)
      URL.revokeObjectURL(src)

      const compiler = new window.MINDAR.IMAGE.Compiler()
      await compiler.compileImageTargets([img], progress => {
        setPercent(progress.toFixed(0))
      })

      const exportedBuffer = await compiler.exportData()
      var targetBlob = new Blob([exportedBuffer])
      var targetFile = new File([targetBlob], `${pieceId}-targets.mind`)

      console.log('got target file')

      let { signedUrl, imageFilepath } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: `${pieceId}-targets`,
          fileType: 'application/mind',
        },
      })

      console.log('got signed url')

      await request({ url: signedUrl, method: 'PUT', data: targetFile })

      await updatePack({
        id: pieceId,
        isPublic: true,
        cards: [{ ...media, targets: imageFilepath }],
      })
    } catch (err) {
      console.log(err)
      console.log(err.message)
      setError({
        message:
          'Sorry, there was an error creating your experience. Please try again.',
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (targets) {
      setIsLoading(false)
    }
  }, [targets])

  return (
    <>
      <BarEditPiece />
      <WelcomeDialog
        open={welcomeDialogIsOpen}
        onClose={() => setWelcomeDialogIsOpen(false)}
      />
      <AdminNav isPublic>
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
                              imageSrc={imageSrc}
                              imageHeight={imageHeight}
                              imageWidth={imageWidth}
                              videoSrc={videoSrc}
                              videoDuration={videoDuration}
                              disabled={!!targets}
                            />
                            <LinkIcon
                              fontSize="large"
                              color={targets ? 'primary' : 'secondary'}
                            />
                            <AddMediaButton
                              mediaType="video"
                              updateMedia={handleUpdateMedia}
                              videoSrc={videoSrc}
                              disabled={!!targets}
                            />
                          </Box>
                          <Box width="320px" mt={4} mb={4}>
                            <LoadingButton
                              variant={targets ? 'outlined' : 'contained'}
                              fullWidth
                              disabled={!imageSrc || !videoSrc || !!targets}
                              onClick={getImageTargets}
                              endIcon={<AutoFixHigh />}
                              loading={isLoading}
                              loadingPosition="end"
                              sx={{
                                '&.Mui-disabled': {
                                  borderColor: targets ? 'primary.main' : null,
                                  color: targets ? 'primary.main' : null,
                                },
                              }}
                            >
                              {isLoading ? (
                                <b>Building experience... {percent}%</b>
                              ) : targets ? (
                                <b>Published!</b>
                              ) : (
                                <b>Create Experience</b>
                              )}
                            </LoadingButton>
                          </Box>
                          <Box
                            width="100%"
                            display="flex"
                            color={targets ? 'text.primary' : '#cccccc'}
                          >
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
                                    the image to the right.
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
                                      to={`/preview/${pieceId}/${media.id}`}
                                      disabled={!targets}
                                    >
                                      View Preview Page
                                    </Button>
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box>
                              <Box width="144px" height="144px">
                                {targets ? (
                                  <>
                                    <QRCode
                                      size={144}
                                      id="qr"
                                      value={experiencePage}
                                      includeMargin={true}
                                    />
                                    <Button size="small">Download QR</Button>
                                    <Button size="small">Copy Link</Button>
                                  </>
                                ) : (
                                  <QrCode2 sx={{ fontSize: 144 }} />
                                )}
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
