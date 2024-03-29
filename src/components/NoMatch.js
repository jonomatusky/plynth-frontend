import React, { useEffect } from 'react'
import { Grid, Typography, Button, Box, Link } from '@mui/material'
import Div100vh from './Div100vh'
import posthog from 'posthog-js'

const NoMatch = ({ fontColor, onClose }) => {
  useEffect(() => {
    posthog.capture('No Match')
  }, [])

  return (
    <Div100vh width="100%">
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={8} md={6}>
            <Typography variant="h6" align="center" sx={{ color: fontColor }}>
              <b>Sorry, that doesn't look right 🧐</b>
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              Give it another try. Make sure to take a photo with:
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              1. Good lighting
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              2. Minimal glare
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              3. The entire object in the frame
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              If you think there's an error,{' '}
              <Link
                href="/s/contact"
                target="_blank"
                color="inherit"
                underline="always"
              >
                contact us
              </Link>
              .
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button onClick={onClose} color="secondary">
              <Box sx={{ color: fontColor }}>Try Again</Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Div100vh>
  )
}

export default NoMatch
