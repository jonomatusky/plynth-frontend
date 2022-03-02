import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

import usePageTrack from 'hooks/use-page-track'

import scanImage from 'images/scan.svg'
import experienceImage from 'images/experience.svg'
import Image from 'components/Image'
import BarAccount from 'layouts/BarAccount'
// import LoadingScreen from 'components/LoadingScreen'
import arrow from 'images/arrow.svg'
import Logo from 'images/plynth_logo_color.svg'

const DemoPreview = () => {
  usePageTrack()
  const [message, setMessage] = useState()

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
            xs: 0.666667 * 350 + 'px',
            lg: 0.666667 * 450 + 'px',
          },
        }}
        mr={2}
        boxShadow="5px 5px 15px #00000040"
        position="relative"
      >
        <img
          src="https://plynth-barebones.s3.us-east-2.amazonaws.com/32cf9ba7-bcd7-48eb-a42c-b89e782dd72d.jpeg"
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
      copy('https://plynth.com/s/demo')
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
              <Link to="/">
                <Image src={Logo} height="24px" width="91px" />
              </Link>
            </Box>
            <Box flexGrow={1} />
          </>
        }
        right={
          <>
            {/* <Box pr={1} sx={{ display: { xs: 'none', md: 'block' } }}>
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
            )} */}
          </>
        }
      />

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
                      <Typography variant="h5">Switch to Desktop</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        To view this demo, please open this page on your
                        desktop.
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
                            This experince was created using Plynth. Scan the QR
                            code to try it out before you print.
                          </Typography>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
                          <Grid item xs={3}></Grid>
                          <Grid item xs={6} container justifyContent="center">
                            <Box m={1} mb={0} textAlign="center">
                              <QRCode
                                size={160}
                                id="qr"
                                value="https://ar.plynth.com/gum-dec/"
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
                              <Image src={arrow} style={{ width: '100%' }} />
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
                              2. Hold your device over the image to the right{' '}
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
    </>
  )
}

export default DemoPreview
