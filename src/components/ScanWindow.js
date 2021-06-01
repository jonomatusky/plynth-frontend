import React, { useRef, useCallback } from 'react'
import { Box, CircularProgress, Fab } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'
import Webcam from 'react-webcam'
import useScanStore from 'hooks/store/use-scan-store'
import useAlertStore from 'hooks/store/use-alert-store'

const ScanWindow = ({
  onUserMedia,
  onUserMediaError,
  hasUserMedia,
  children,
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
      await startScan(imageSrc)
    } catch (err) {
      clearError()
    }
  }, [webcamRef, startScan, clearError])

  return (
    <>
      <Box
        display="flex"
        position="fixed"
        zIndex="10"
        bottom={16}
        width="100%"
        justifyContent="center"
      >
        {hasUserMedia ? (
          <Fab onClick={capture} variant="outlined">
            <CameraAlt fontSize="large" />
          </Fab>
        ) : (
          <CircularProgress sx={{ color: 'white' }} />
        )}
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
        {children}
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
  )
}

export default ScanWindow
