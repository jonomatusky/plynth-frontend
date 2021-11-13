import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Grid,
  Box,
  Container,
  Button,
  Paper,
  Typography,
  Snackbar,
  SnackbarContent,
} from '@mui/material'
import { FilterNone } from '@mui/icons-material'
import QRCode from 'qrcode.react'
import copy from 'copy-to-clipboard'

import { useRequest } from 'hooks/use-request'
import usePageTrack from 'hooks/use-page-track'
import { useFetch } from 'hooks/use-fetch'
import SomethingWentWrong from 'components/SomethingWentWrong'
import scanImage from 'images/scan.svg'
import experienceImage from 'images/experience.svg'
import Image from 'components/Image'
import BarAccount from 'layouts/BarAccount'
import LoadingScreen from 'components/LoadingScreen'
import arrow from 'images/arrow.svg'
import Logo from 'images/plynth_logo_color.svg'
import useUserStore from 'hooks/store/use-user-store'

const { REACT_APP_PUBLIC_URL } = process.env

const Preview = () => {
  const { user } = useUserStore()
  const [pack, setPack] = useState(null)

  const { pieceId, cardId } = useParams()

  const previewPage =
    REACT_APP_PUBLIC_URL + '/preview/' + pieceId + '/' + cardId

  const experiencePage = REACT_APP_PUBLIC_URL + '/p/' + pieceId

  useFetch()
  usePageTrack()

  const { request, status } = useRequest()

  useEffect(() => {
    const getPack = async () => {
      try {
        const response = await request({
          url: `/packs/${pieceId}`,
          method: 'GET',
        })
        const { pack } = response || {}
        setPack(pack)

        const { style } = pack || {}

        if (pack && pack.isPublic && pack.shareWithLink) {
          if ((style || {}).backgroundColor) {
            document.body.style.backgroundColor = style.backgroundColor
          }
        }
      } catch (err) {}
    }
    if (status === 'idle') {
      getPack()
    }
  }, [pieceId, request, status])

  const { cards, isPublic } = pack || {}
  const card = (cards || [{}])[0]
  const { imageUrl, imageHeight, imageWidth, type } = card

  const isOwner = !!user && !!pack && user.id === (pack || {}).owner._id

  const [message, setMessage] = useState()
  console.log(isOwner)

  useEffect(() => {
    if (isOwner) {
      console.log('setting message')
      setMessage(
        'This is your preview page. Share with friends and collaborators to let them try it out before you print.'
      )
    }
  }, [isOwner, setMessage])

  const DisplayCard = () => {
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
            xs: imageUrl ? (imageHeight / imageWidth) * 350 + 'px' : '525px',
            lg: imageUrl ? (imageHeight / imageWidth) * 450 + 'px' : '675px',
          },
        }}
        mr={2}
        boxShadow="5px 5px 15px #00000040"
        position="relative"
      >
        {imageUrl && (
          <img
            src={imageUrl}
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
        )}
      </Box>
    )
  }

  // const CopyButton = () => {
  //   const [isCopied, setIsCopied] = useState(false)

  //   useEffect(() => {
  //     const timer = setTimeout(() => setIsCopied(false), 2000)
  //     return () => clearTimeout(timer)
  //   }, [isCopied])

  //   const handleCopy = () => {
  //     setIsCopied(true)
  //     copy(experiencePage)
  //   }

  //   return (
  //     <Button
  //       size="small"
  //       color="secondary"
  //       endIcon={<FilterNone />}
  //       onClick={handleCopy}
  //     >
  //       {isCopied ? 'Copied!' : 'Copy QR Link'}
  //     </Button>
  //   )
  // }

  const CopyPageButton = () => {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => setIsCopied(false), 2000)
      return () => clearTimeout(timer)
    }, [isCopied])

    const handleCopy = () => {
      setIsCopied(true)
      copy(previewPage)
    }

    return (
      <Button
        variant="outlined"
        color="primary"
        endIcon={<FilterNone />}
        disableElevation
        onClick={handleCopy}
        sx={{ textTransform: 'none' }}
      >
        {isCopied ? 'Copied!' : 'Copy Link'}
      </Button>
    )
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!message}
        onClose={() => setMessage(null)}
      >
        <SnackbarContent
          sx={{
            backgroundColor: 'secondary.main',
            borderRadius: 0,
            fontWeight: 'bold',
          }}
          message={message}
          action={
            <Button
              sx={{ minWidth: '30px ' }}
              onClick={() => setMessage(null)}
              color="inherit"
              size="small"
            >
              Got It
            </Button>
          }
        />
      </Snackbar>
      <BarAccount
        left={
          <>
            <Box ml={2}>
              <Link to={isOwner ? '/admin' : '/'}>
                <Image src={Logo} height="24px" width="91px" />
              </Link>
            </Box>
            <Box flexGrow={1} />
          </>
        }
        right={
          <>
            <Box pr={1} sx={{ display: { xs: 'none', md: 'block' } }}>
              <CopyPageButton />
            </Box>
            {!isOwner && (
              <Box pr={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  sx={{ textTransform: 'none' }}
                  component={Link}
                  to="/signup"
                >
                  <b>Create Your Own</b>
                </Button>
              </Box>
            )}
          </>
        }
      />
      {(status === 'idle' || status === 'loading') && !isPublic && (
        <LoadingScreen backgroundColor={'theme.palette.background.card'} />
      )}
      {status === 'failed' && <SomethingWentWrong />}

      {status === 'succeeded' && (
        <>
          {isPublic && cardId === card.id && imageUrl && type === 'ar' ? (
            <Box
              mt="48px"
              height="calc(100vh - 48px)"
              width="100%"
              overflow="auto"
              display="flex"
              alignContent="center"
            >
              <Container disableGutters maxWidth="lg">
                <Grid
                  container
                  justifyContent="center"
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <Grid item mt={2} xs={11}>
                    <Paper>
                      <Box padding={2}>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item xs={12}>
                            <Typography variant="h5">
                              Switch to Desktop
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>
                              Sorry, you can't view the preview page on mobile.
                              Please switch to desktop.
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <CopyPageButton />
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="flex-start"
                  mt={1}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  <Grid item xs={7} container justifyContent="center">
                    <Grid item xs={11} lg={9}>
                      <Box margin={4}>
                        <Paper>
                          <Box padding={4} pb={6}>
                            <Grid container spacing={2} width="100%">
                              <Grid item xs={12}>
                                <Typography variant="h4" color="primary">
                                  <b>Preview</b>
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography>
                                  This experince was created using Plynth. Scan
                                  the QR code to try it out before you print.
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                container
                                justifyContent="center"
                              >
                                <Grid item xs={3}></Grid>
                                <Grid
                                  item
                                  xs={6}
                                  container
                                  justifyContent="center"
                                >
                                  <Box m={1} mb={0} textAlign="center">
                                    <QRCode
                                      size={160}
                                      id="qr"
                                      value={experiencePage}
                                    />
                                    {/* <CopyButton /> */}
                                  </Box>
                                </Grid>
                                <Grid item xs={3} textAlign="center" pt={6}>
                                  <Box
                                    textAlign="center"
                                    sx={{
                                      display: { xs: 'none', md: 'block' },
                                    }}
                                  >
                                    <Image
                                      src={arrow}
                                      style={{ width: '100%' }}
                                    />
                                    <Typography variant="h6">
                                      <b>Try Me</b>
                                    </Typography>{' '}
                                  </Box>
                                </Grid>
                              </Grid>

                              <Grid
                                item
                                xs={6}
                                container
                                justifyContent="center"
                                spacing={2}
                                mt={1}
                              >
                                <Image height="72px" src={scanImage} />
                                <Grid item xs={12}>
                                  <Typography>
                                    1. Scan the QR code with your mobile device
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                container
                                justifyContent="center"
                                spacing={2}
                                mt={1}
                              >
                                <Image height="72px" src={experienceImage} />
                                <Grid item xs={12}>
                                  <Typography>
                                    2. Hold your device over the image to the
                                    right{' '}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                            {/* <Box
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                            width="100%"
                            flexWrap="wrap"
                          ></Box> */}
                          </Box>
                        </Paper>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid item xs={5}>
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
          ) : (
            <SomethingWentWrong />
          )}
        </>
      )}
    </>
  )
}

export default Preview
