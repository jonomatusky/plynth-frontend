import React from 'react'
import { Grid, Typography, Button, Box, Link } from '@material-ui/core'
import Div100vh from './Div100vh'

const ScanError = ({ fontColor, onClose }) => {
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
          <Grid item xs={8}>
            <Typography variant="h6" align="center" sx={{ color: fontColor }}>
              <b>Something went wrong. Please try again.</b>
            </Typography>
            <Typography align="center" sx={{ color: fontColor }}>
              If you keep seeing this error,{' '}
              <Link
                href="/s/contact"
                target="_blank"
                color="inherit"
                underline="always"
              >
                contact us
              </Link>{' '}
              .
            </Typography>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button onClick={onClose}>
              <Box sx={{ color: 'white' }}>Try Again</Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Div100vh>
  )
}

export default ScanError
