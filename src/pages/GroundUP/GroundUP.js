import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import ScanScreen from 'components/ScanScreen'
import GroundUPLogo from './images/groundup-logo.png'
import useScanStore from 'hooks/store/use-scan-store'
import NotFound from 'components/NotFound'
import Pack from 'components/Pack'
import GroundUpLoading from './components/GroundUpLoading'
import NoMatch from 'components/NoMatch'
import CameraDialog from 'components/CameraDialog'
import { CameraAlt, Clear } from '@material-ui/icons'
import ScanError from 'components/ScanError'

const GroundUP = () => {
  const { clearScan, foundPack, error, status } = useScanStore()
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  const backgroundColor = 'black'
  const fontColor = 'white'

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

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [])

  const handleClose = () => {
    clearScan()
  }

  console.log(imageIsLoaded)

  if (error) {
    return <ScanError fontColor={fontColor} onClose={handleClose} />
  } else if (status === 'loading') {
    return <GroundUpLoading />
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
                <Grid item xs={12} container justifyContent="center">
                  <img
                    alt="GroundUp Logo"
                    src={GroundUPLogo}
                    style={{
                      width: '150px',
                      display: imageIsLoaded ? null : 'none',
                    }}
                    onLoad={() => setImageIsLoaded(true)}
                  />
                  {!imageIsLoaded && <Box height="150px" width="150px" />}
                </Grid>
                <Grid item xs={10}>
                  <Box color={fontColor} pt={2} pb={2}>
                    <Typography textAlign="center">
                      Take a photo of the front of your postcard to access this
                      month's newsletter
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => setCameraAuthorizationStatus('requested')}
                    endIcon={<CameraAlt style={{ color: '#EBB710' }} />}
                    disableRipple
                  >
                    <Box color="#EBB710">Authorize Camera</Box>
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
              <Button
                onClick={() => setHelpDialogIsOpen(true)}
                size="small"
                disableRipple
              >
                <Box color={fontColor} fontSize={12}>
                  Having Trouble?
                </Box>
              </Button>
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
                <Grid item>
                  <Box display="flex" justifyContent="center">
                    <Box
                      width="90vw"
                      maxWidth="600px"
                      height="60vw"
                      maxHeight="400px"
                      border={'8px dashed #ffffff88'}
                    />
                  </Box>
                </Grid>
                <Grid item xs={11}>
                  <Box color={fontColor}>
                    <Typography variant="h6" textAlign="center">
                      <b>
                        Snap a photo of your postcard to unlock this month's
                        newsletter
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

export default GroundUP
