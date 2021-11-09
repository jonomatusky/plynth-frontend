import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CameraDialog from 'components/CameraDialog'
import ScanScreen from 'components/ScanScreen'
import { Typography, Box, Grid, Button } from '@mui/material'
import { Clear } from '@mui/icons-material'

const PickupScreen = ({ fontColor, backgroundColor, instructions }) => {
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
            maxWidth="100vw"
            bottom={0}
            position="absolute"
            top="auto"
            right={0}
            left={0}
            display="flex"
            justifyContent="center"
            mb={10}
            zIndex="5"
          >
            {hasUserMedia && (
              <Grid container justifyContent="center">
                <Grid item xs={11}>
                  <Typography
                    variant="h6"
                    textAlign="center"
                    color={fontColor}
                    sx={{ textShadow: '0px 1px 7px #555555' }}
                  >
                    <b>
                      {instructions || `Snap a photo to unlock your content`}
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </ScanScreen>
      )}
    </>
  )
}

export default PickupScreen
