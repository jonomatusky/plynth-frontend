import React, { useCallback, useRef } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  Typography,
} from '@material-ui/core'
import { CameraAlt, Clear } from '@material-ui/icons'
import Div100vh from 'components/Div100vh'
import useAlertStore from 'hooks/store/use-alert-store'
import useScanStore from 'hooks/store/use-scan-store'

import Webcam from 'react-webcam'

const PortalCamera = ({
  onUserMedia,
  onUserMediaError,
  hasUserMedia,
  backgroundColor,
  fontColor,
  instructions,
  onClose,
  portal,
}) => {
  const { startScan } = useScanStore()
  const { clearError } = useAlertStore()

  const videoConstraints = {
    facingMode: 'environment',
  }

  const webcamRef = useRef(null)

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot()

    try {
      await startScan(imageSrc, portal)
    } catch (err) {
      clearError()
    }
  }, [webcamRef, startScan, clearError, portal])

  return (
    <Div100vh width="100vw">
      <Box position="absolute" zIndex="0" width="100%" height="100%">
        <>
          <Box
            display="flex"
            position="fixed"
            zIndex="10"
            bottom={16}
            width="100%"
            justifyContent="center"
          >
            <Grid container justifyContent="center" spacing={1}>
              {hasUserMedia ? (
                <>
                  <Grid item xs={11}>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      color="white"
                      sx={{ textShadow: '0px 1px 7px #555555' }}
                    >
                      <b>
                        {instructions || `Snap a photo to unlock your content`}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} container justifyContent="center">
                    <Fab
                      onClick={capture}
                      variant="outlined"
                      aria-label="Take photo"
                    >
                      <CameraAlt fontSize="large" />
                    </Fab>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12} container justifyContent="center">
                  <CircularProgress sx={{ color: 'white' }} />
                </Grid>
              )}
            </Grid>
          </Box>
          <Box
            display="flex"
            position="absolute"
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            zIndex="5"
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
                onClick={onClose}
                size="small"
                color="inherit"
                disableRipple
                endIcon={<Clear sx={{ color: '#ffffff' }} aria-label="Close" />}
              >
                <Box color={'#ffffff'}>Close</Box>
              </Button>
            </Box>
            <Box
              bottom="0"
              position="absolute"
              top="auto"
              display="flex"
              justifyContent="flex-end"
              paddingBottom="0.25rem"
              left="0"
              right="0"
              zIndex="5"
              pt={1}
              pr={1}
            >
              {hasUserMedia && (
                <Grid container justifyContent="center">
                  <Grid item xs={11}>
                    {/* <Typography
                      variant="h6"
                      textAlign="center"
                      color={fontColor}
                      sx={{ textShadow: '0px 1px 7px #555555' }}
                    >
                      <b>
                        {instructions || `Snap a photo to unlock your content`}
                      </b>
                    </Typography> */}
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>
          <Box
            height="100%"
            maxWidth="100%"
            display="flex"
            justifyContent="center"
            overflow="hidden"
          >
            <Webcam
              audio={false}
              height="100%"
              screenshotFormat="image/jpeg"
              ref={webcamRef}
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
              onUserMediaError={onUserMediaError}
            />
          </Box>
        </>
      </Box>
    </Div100vh>
  )
}

export default PortalCamera
