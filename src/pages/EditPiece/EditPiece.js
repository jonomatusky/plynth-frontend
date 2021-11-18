import React, { useEffect, useRef, useState } from 'react'
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
  Download,
  FilterNone,
  ArrowForward,
  Visibility,
  Computer,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard'
import { isMobile } from 'react-device-detect'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'

import BarEditPiece from 'layouts/BarEditPiece'
import AddMediaButton from './components/AddMediaButton'
import WelcomeDialog from './components/WelcomeDialog'
import { useRequest } from 'hooks/use-request'
import { useAlertStore } from 'hooks/store/use-alert-store'
import axios from 'axios'
import { loadImgAsync } from 'util/imageHandling'
import DownloadQR from 'components/DownloadQr'
// import OnboardingTooltip from 'components/OnboardingTooltip'

const { REACT_APP_ASSET_URL, REACT_APP_PUBLIC_URL } = process.env

const demoImageName = 'Postcard+Mixtape+Vol+1+600px.jpg'
const demoImageUrl = REACT_APP_ASSET_URL + '/' + demoImageName

const EditPiece = () => {
  const { selectPack, packs, updatePack } = usePackStore()

  const { pieceId } = useParams()
  const experiencePage = !!pieceId
    ? REACT_APP_PUBLIC_URL + '/p/' + pieceId
    : null

  const pack = selectPack(pieceId)

  const cards = (pack || {}).cards
  const media = (cards || [{}])[0]

  const previewPage = !!media.id ? `/preview/${pieceId}/${media.id}` : null

  const { setError } = useAlertStore()

  const {
    image,
    imageUrl,
    imageHeight,
    imageWidth,
    video,
    videoDuration,
    targets,
  } = media

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
    const [hideImage, setHideImage] = useState(false)
    const [hideVideo, setHideVideo] = useState(!!targets)

    const playerRef = useRef()

    useEffect(() => {
      if (!!video && !targets && !isLoading) {
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
      } else if (targets) {
        setHideImage(false)
        setHideVideo(true)
      } else {
        setHideImage(false)
        setHideVideo(false)
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
              <b>Your Preview Here</b>
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

  const showOnboarding = packs.length === 1 && !isMobile
  const showWelcomeDialogAtStart =
    showOnboarding && !imageSrc && !videoSrc && !targets

  const [welcomeDialogIsOpen, setWelcomeDialogIsOpen] = useState(
    showWelcomeDialogAtStart
  )
  const showTooltips = showOnboarding && !welcomeDialogIsOpen

  useEffect(() => {
    if (showWelcomeDialogAtStart) {
      setWelcomeDialogIsOpen(true)
    }
  }, [showWelcomeDialogAtStart])

  const [isLoading, setIsLoading] = useState(false)
  const [percent, setPercent] = useState(0)

  const { request } = useRequest()

  const getImageTargets = async () => {
    setIsLoading(true)

    if (imageSrc === demoImageUrl) {
      try {
        await updatePack({
          id: pieceId,
          isPublic: true,
          cards: [
            {
              ...media,
              targets: '9ff785ec-2c25-43d7-a886-601a1a7aa3b3.mind',
            },
          ],
        })
      } catch (err) {}
      return
    }

    try {
      const response = await axios.request({
        url: imageSrc,
        responseType: 'blob',
      })

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

      let { signedUrl, imageFilepath } = await request({
        url: '/auth/sign-s3',
        method: 'POST',
        data: {
          fileName: `${pieceId}-targets`,
          fileType: 'application/mind',
        },
      })

      await request({
        url: signedUrl,
        method: 'PUT',
        data: targetFile,
        timeout: 100000,
      })

      await updatePack({
        id: pieceId,
        isPublic: true,
        cards: [{ ...media, targets: imageFilepath }],
      })
    } catch (err) {
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

  const CopyButton = () => {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }, [isCopied])

    const handleCopy = () => {
      setIsCopied(true)
      copy(experiencePage)
    }

    return (
      <Button
        size="small"
        color="secondary"
        endIcon={<FilterNone />}
        onClick={handleCopy}
        disabled={!targets}
      >
        {isCopied ? 'Copied!' : 'Copy Link'}
      </Button>
    )
  }

  return (
    <>
      <BarEditPiece previewPageUrl={targets ? previewPage : null} />
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
              <Grid
                item
                sm={12}
                container
                justifyContent="center"
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                <Grid item mt={2} xs={11}>
                  <Paper>
                    <Box padding={2}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} textAlign="center">
                          <Computer sx={{ fontSize: 60 }} color="primary" />
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6" textAlign="center">
                            Please Switch to Desktop
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>
                            Please switch to desktop to create your first
                            interactive experience. Then you'll be able to try
                            it out on your mobile device!
                          </Typography>
                        </Grid>
                        <Grid item xs={12} pb={2} mt={2}>
                          <Button
                            variant="contained"
                            component={Link}
                            to="/admin"
                            fullWidth
                          >
                            Go Home
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid
                item
                sm={12}
                md={7}
                container
                justifyContent="center"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <Grid item xs={11} lg={8}>
                  <Box mt={4} mb={4}>
                    <Paper>
                      <Box padding={4} pb={2}>
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
                            flexWrap="wrap"
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
                              showTooltips={showTooltips}
                            />

                            <LinkIcon
                              fontSize="large"
                              color={targets ? 'primary' : 'secondary'}
                              sx={{ display: { xs: 'none', sm: 'block' } }}
                            />

                            <AddMediaButton
                              mediaType="video"
                              updateMedia={handleUpdateMedia}
                              videoDuration={videoDuration}
                              videoSrc={videoSrc}
                              imageSrc={imageSrc}
                              disabled={!!targets}
                              showTooltips={showTooltips}
                            />
                          </Box>
                          <Box width="320px" mt={4} mb={4}>
                            {/* <OnboardingTooltip
                              open={
                                showTooltips &&
                                !!imageSrc &&
                                !!videoSrc &&
                                !targets
                              }
                              title="Now link your image and video to generate your experience, then give it a try!"
                              position="bottom"
                            > */}
                            <LoadingButton
                              variant={targets ? 'outlined' : 'contained'}
                              fullWidth
                              disabled={!imageSrc || !videoSrc || !!targets}
                              onClick={getImageTargets}
                              endIcon={
                                targets ? (
                                  <ArrowForward
                                    sx={{ transform: 'rotate(45deg)' }}
                                  />
                                ) : (
                                  <AutoFixHigh />
                                )
                              }
                              loading={isLoading}
                              loadingPosition="end"
                              sx={{
                                display: { xs: 'none', md: 'flex' },
                                '&.Mui-disabled': {
                                  borderColor: targets ? 'primary.main' : null,
                                  color: targets ? 'primary.main' : null,
                                },
                              }}
                            >
                              {isLoading ? (
                                <b>Building experience... {percent}%</b>
                              ) : targets ? (
                                <b>Ready to Go!</b>
                              ) : (
                                <b>Create Experience</b>
                              )}
                            </LoadingButton>
                            {/* </OnboardingTooltip> */}
                            {targets ? (
                              <LoadingButton
                                variant="outlined"
                                fullWidth
                                href={experiencePage}
                                target="_blank"
                                endIcon={<Visibility />}
                                sx={{
                                  display: { xs: 'flex', md: 'none' },
                                }}
                              >
                                <b>Open Experience</b>
                              </LoadingButton>
                            ) : (
                              <LoadingButton
                                variant={'contained'}
                                fullWidth
                                disabled={!imageSrc || !videoSrc || !!targets}
                                onClick={getImageTargets}
                                endIcon={<AutoFixHigh />}
                                loading={isLoading}
                                loadingPosition="end"
                                sx={{
                                  display: { xs: 'block', md: 'none' },
                                }}
                              >
                                {isLoading ? (
                                  <b>Building experience... {percent}%</b>
                                ) : (
                                  <b>Create Experience</b>
                                )}
                              </LoadingButton>
                            )}
                          </Box>
                          <Box
                            width="100%"
                            color={targets ? 'text.primary' : '#cccccc'}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
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
                                      href={previewPage}
                                      target="_blank"
                                      disabled={!targets}
                                    >
                                      View Preview Page
                                    </Button>
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="flex-start"
                              flexWrap="wrap"
                              height="100%"
                              ml={1}
                            >
                              <Box width="120px" height="120px" m={1} mb={0}>
                                {targets ? (
                                  <QRCode
                                    size={120}
                                    id="qr"
                                    value={experiencePage}
                                  />
                                ) : (
                                  <QrCode2 sx={{ fontSize: 120 }} />
                                )}
                              </Box>
                              {targets && (
                                <>
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    pt={1}
                                  >
                                    <Typography>
                                      <b>Scan to try</b>
                                    </Typography>
                                    <ArrowForward fontSize="small" />
                                  </Box>
                                  <CopyButton />
                                </>
                              )}
                            </Box>
                          </Box>
                          <Box
                            width="400px"
                            mt={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography
                              variant="caption"
                              textAlign="center"
                              mt={2}
                            >
                              Ready to print? Download the QR code to include in
                              your designs.
                            </Typography>
                          </Box>
                          <Box width="320px" mt={1}>
                            <DownloadQR
                              qrValue={experiencePage}
                              fileName={pieceId}
                            >
                              <Button
                                variant="contained"
                                fullWidth
                                endIcon={<Download />}
                                disabled={!targets}
                              >
                                Download QR Code
                              </Button>
                            </DownloadQR>
                          </Box>
                          <Box width="320px" mb={1} mt={1}>
                            <Button
                              fullWidth
                              endIcon={<Download />}
                              href={imageUrl}
                              disabled={!targets}
                            >
                              Download Artwork
                            </Button>
                          </Box>
                          {/* <Box width="320px" mt={3} mb={1}>
                            <Button variant="contained" fullWidth disabled>
                              <b>Download Print Files</b>
                            </Button>
                          </Box>
                          <Box color="#cccccc">
                            <Typography variant="caption">
                              Need help printing? Check out our list of{' '}
                              <u>local and national printers</u>
                            </Typography>
                          </Box> */}
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

export default EditPiece
