import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CameraDialog from 'components/CameraDialog'
import ScanScreen from 'components/ScanScreen'
import { Typography, Box, Button } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

const PickupScreen = ({ fontColor, backgroundColor }) => {
  const [helpDialogIsOpen, setHelpDialogIsOpen] = useState(false)
  const [hasUserMedia, setHasUserMedia] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

  const handleUserMediaError = () => {
    setTimeout(() => setHelpDialogIsOpen(true), 1000)
  }

  const handleUserMedia = () => {
    setHasUserMedia(true)
  }

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

export default PickupScreen
