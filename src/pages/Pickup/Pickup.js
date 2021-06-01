import React, { useEffect, useState } from 'react'
import { Typography, Box, Button } from '@material-ui/core'
import ScanScreen from 'components/ScanScreen'
import useScanStore from 'hooks/store/use-scan-store'
import NotFound from 'components/NotFound'
import Pack from 'components/Pack'
import NoMatch from 'components/NoMatch'
import CameraDialog from 'components/CameraDialog'
import { Clear } from '@material-ui/icons'
import ScanError from 'components/ScanError'
import { Link } from 'react-router-dom'
import LoadingScreen from 'components/LoadingScreen'

const Pickup = () => {
  const { clearScan, foundPack, error, status } = useScanStore()

  const backgroundColor = 'black'
  const fontColor = 'white'

  const [helpDialogIsOpen, setHelpDialogIsOpen] = useState(false)
  const [hasUserMedia, setHasUserMedia] = useState(false)

  const handleUserMediaError = () => {
    setHelpDialogIsOpen(true)
  }

  const handleUserMedia = () => {
    setHasUserMedia(true)
  }

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [])

  const handleClose = () => {
    clearScan()
  }

  if (error) {
    return <ScanError fontColor={fontColor} onClose={clearScan} />
  } else if (status === 'loading') {
    return <LoadingScreen color="white" />
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
        {!helpDialogIsOpen && (
          <ScanScreen
            onUserMediaError={handleUserMediaError}
            onUserMedia={handleUserMedia}
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
                component={Link}
                to={'/'}
                size="small"
                color="inherit"
                disableRipple
                endIcon={<Clear sx={{ color: fontColor }} />}
              >
                <Box color={fontColor}>Close</Box>
              </Button>
            </Box>

            <Box
              bottom={0}
              position="absolute"
              top="auto"
              display="flex"
              justifyContent="center"
              mb={10}
              zIndex="5"
            >
              {hasUserMedia && (
                <Box color={fontColor}>
                  <Typography variant="h6" textAlign="center">
                    <b>Snap a photo to unlock your content</b>
                  </Typography>
                </Box>
              )}
            </Box>
          </ScanScreen>
        )}
      </>
    )
  }
}

export default Pickup
