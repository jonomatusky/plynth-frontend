import React, { useState } from 'react'
import { Grid, Typography, Box, Button, Link } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'

const PortalContent = ({ portal, onOpenCamera, showHelpDialog }) => {
  const [imageIsLoaded, setImageIsLoaded] = useState(false)

  const { title, text, style, image, imageUrl, hideBranding } = portal || {}
  const { font, fontColor, backgroundColor, buttonColor } = style || {}

  return (
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
          {image && (
            <Grid item xs={12} container justifyContent="center">
              <>
                <img
                  alt="Logo"
                  onClick={onOpenCamera}
                  src={imageUrl}
                  style={{
                    width: '150px',
                    height: '150px',
                    display: imageIsLoaded ? null : 'none',
                  }}
                  onLoad={() => setImageIsLoaded(true)}
                />
                {!imageIsLoaded && <Box height="150px" width="150px" />}
              </>
            </Grid>
          )}
          {title && (
            <Grid item xs={10}>
              <Box color={fontColor} pt={2}>
                <Typography textAlign="center" fontFamily={font} variant="h5">
                  <b>{title}</b>
                </Typography>
              </Box>
            </Grid>
          )}
          {text && (
            <Grid item xs={10}>
              <Box color={fontColor} pb={2}>
                <Typography textAlign="center" fontFamily={font}>
                  {text || `Snap a photo to access your content`}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              onClick={onOpenCamera}
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
            <Button onClick={showHelpDialog} size="small" disableRipple>
              <Box color={fontColor} fontSize={12}>
                Having Trouble?
              </Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PortalContent
