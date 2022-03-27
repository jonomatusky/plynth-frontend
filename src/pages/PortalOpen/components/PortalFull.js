import React from 'react'
import { Grid, Typography, Box, Button, Link } from '@mui/material'
import { Close } from '@mui/icons-material'
import Image from 'components/Image'
import PartysOver from 'images/partys_over.png'

const PortalFull = ({ portalUser, onClose }) => {
  const { portal, username } = portalUser || {}
  const { style, hideBranding } = portal || {}
  let { font, fontColor, backgroundColor, buttonColor } = style || {}

  return (
    <>
      <Box
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        position="absolute"
        zIndex="20"
        backgroundColor={backgroundColor || '#ffffff'}
      >
        <Grid container justifyContent="center" textAlign="center" spacing={2}>
          <Grid item xs={12} container justifyContent="center">
            <Image height="100px" src={PartysOver} alt="Party's OVer" />
          </Grid>
          <Grid item xs={10}>
            <Box color={fontColor || '#000000'}>
              <Typography textAlign="center" fontFamily={font} variant="h6">
                Sorry, party's full (for now)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={10} md={6}>
            <Box color={fontColor || '#000000'}>
              <Typography textAlign="center" fontFamily={font}>
                <b>@{username}</b> has a limit on how many users can access
                their content each month. Try again next month!
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              endIcon={<Close style={{ color: buttonColor || '#000000' }} />}
              disableRipple
              color="secondary"
            >
              <Box color={buttonColor || '#000000'} onClick={onClose}>
                <Typography fontFamily={font}>Close</Typography>
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
                color={fontColor || '#000000'}
                sx={{
                  opacity: '0.6',
                }}
              >
                <Typography variant="subtitle2">
                  <Link
                    href="/"
                    color="inherit"
                    underline="always"
                    target="_blank"
                  >
                    Powered by Leaflet
                  </Link>
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  )
}

export default PortalFull
