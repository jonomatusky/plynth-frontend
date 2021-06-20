import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button, Link } from '@material-ui/core'
import ScanScreen from 'components/ScanScreen'
import useScanStore from 'hooks/store/use-scan-store'
import NotFound from 'components/NotFound'
import Pack from 'components/Pack'
import ProfileLoading from 'components/PortalLoading'
import NoMatch from 'components/NoMatch'
import CameraDialog from 'components/CameraDialog'
import { CameraAlt, Clear } from '@material-ui/icons'
import ScanError from 'components/ScanError'

const PortalContent = ({ portal }) => {
  const { title, text, instructions, style, image, imageUrl, hideBranding } =
    portal || {}
  const { font, fontColor, backgroundColor, buttonColor } = style || {}
  const { clearScan, foundPack, error, status } = useScanStore()
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  const [cameraAuthorizationStatus, setCameraAuthorizationStatus] =
    useState('unauthorized')
  const [helpDialogIsOpen, setHelpDialogIsOpen] = useState(false)
  const [hasUserMedia, setHasUserMedia] = useState(false)

  const handleUserMedia = () => {
    setCameraAuthorizationStatus('authorized')
    setHasUserMedia(true)
  }

  const handleUserMediaError = () => {
    setCameraAuthorizationStatus('rejected')
    setHelpDialogIsOpen('true')
  }

  const handleClose = () => {
    clearScan()
  }

  if (error) {
    return <ScanError fontColor={fontColor} onClose={handleClose} />
  } else if (status === 'loading') {
    return <ProfileLoading />
  } else if (status === 'succeeded' && foundPack && foundPack.isPublic) {
    return <Pack pack={foundPack} />
  } else if (status === 'succeeded' && foundPack && !foundPack.isPublic) {
    return <NotFound />
  } else if (status === 'succeeded' && !foundPack) {
    return <NoMatch fontColor={fontColor} onClose={handleClose} />
  } else {
    return (
      <>
        <CameraDialog
          open={helpDialogIsOpen}
          username="groundup"
          onClose={() => setHelpDialogIsOpen(false)}
        />
        {cameraAuthorizationStatus !== 'authorized' && (
          <>
            <Box
              height="100%"
              width="100%"
              display="flex"
              alignItems="center"
              position="absolute"
              zIndex="20"
              backgroundColor={backgroundColor}
            >
              <Grid container justifyContent="center" textAlign="center">
                <Grid item xs={10}>
                  <Box color={fontColor} pt={2} pb={2}>
                    <Typography
                      textAlign="center"
                      fontFamily={font}
                      variant="h5"
                    >
                      <b>{title}</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  {image && (
                    <>
                      <img
                        alt="Logo"
                        onClick={() =>
                          setCameraAuthorizationStatus('requested')
                        }
                        src={imageUrl}
                        style={{
                          width: '125px',
                          height: '125px',
                          display: imageIsLoaded ? null : 'none',
                        }}
                        onLoad={() => setImageIsLoaded(true)}
                      />
                      {!imageIsLoaded && <Box height="150px" width="150px" />}
                    </>
                  )}
                </Grid>
                <Grid item xs={10}>
                  <Box color={fontColor} pt={2} pb={2}>
                    <Typography textAlign="center" fontFamily={font}>
                      {text || `Snap a photo to access your content`}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => setCameraAuthorizationStatus('requested')}
                    endIcon={<CameraAlt style={{ color: buttonColor }} />}
                    disableRipple
                    sx={{
                      borderBottom: `2px solid ${buttonColor}`,
                      borderRadius: '0px',
                      ':hover': {
                        borderBottom: `2px solid ${buttonColor}`,
                        backgroundColor: '#00000000',
                      },
                      ':focus': { borderBottom: `2px solid ${buttonColor}` },
                    }}
                  >
                    <Box color={buttonColor}>
                      <Typography fontFamily={font} variant="h6">
                        <b>Open Camera</b>
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box
              bottom="0"
              position="absolute"
              top="auto"
              display="flex"
              justifyContent="center"
              paddingBottom="0.25rem"
              left="0"
              right="0"
              zIndex="30"
            >
              <Grid container justifyContent="center">
                {!hideBranding && (
                  <Grid item xs={12} container justifyContent="center">
                    <Box
                      color={fontColor}
                      sx={{
                        opacity: '0.6',
                        // '&:hover': {
                        //   opacity: '0.6',
                        // },
                      }}
                    >
                      <Typography variant="subtitle2">
                        <Link
                          href="/#about"
                          color="inherit"
                          underline="always"
                          target="_blank"
                        >
                          Powered by Plynth
                        </Link>
                      </Typography>
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12} container justifyContent="center">
                  <Button
                    onClick={() => setHelpDialogIsOpen(true)}
                    size="small"
                    disableRipple
                  >
                    <Box color={fontColor} fontSize={12}>
                      Having Trouble?
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
        {cameraAuthorizationStatus !== 'unauthorized' &&
          cameraAuthorizationStatus !== 'rejected' && (
            <ScanScreen
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              hasUserMedia={hasUserMedia}
              backgroundColor={backgroundColor}
              fontColor={fontColor}
            >
              <Box
                bottom="auto"
                position="absolute"
                top="0"
                display="flex"
                justifyContent="flex-end"
                paddingBottom="0.25rem"
                left="0"
                right="0"
                zIndex="5"
                pt={1}
                pr={1}
              >
                <Button
                  onClick={() => setCameraAuthorizationStatus('unauthorized')}
                  size="small"
                  color="inherit"
                  disableRipple
                  endIcon={<Clear sx={{ color: fontColor }} />}
                >
                  <Box color={fontColor}>Close</Box>
                </Button>
              </Box>
              <Grid container justifyContent="center" spacing={2}>
                {/* <Grid item>
                  <Box display="flex" justifyContent="center">
                    <Box
                      width="90vw"
                      maxWidth="600px"
                      height="60vw"
                      maxHeight="400px"
                      border={'8px dashed #ffffff88'}
                    />
                  </Box>
                </Grid> */}
                <Grid item xs={11}>
                  <Box color={fontColor}>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      sx={{ textShadow: '0px 1px 7px #555555' }}
                    >
                      <b>
                        {instructions || `Snap a photo to access your content`}
                      </b>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </ScanScreen>
          )}
      </>
    )
  }
}

export default PortalContent
