import React from 'react'
import { Box, Link, Typography } from '@mui/material'

const PowerBar = ({ style }) => {
  return (
    <Box
      bottom="0"
      position="fixed"
      top="auto"
      display="flex"
      justifyContent="center"
      paddingBottom="0.25rem"
      left="0"
      right="0"
      bgcolor={(style || {}).backgroundColor}
    >
      <Box
        color={(style || {}).fontColor}
        sx={{
          opacity: '0.6',
          // '&:hover': {
          //   opacity: '0.6',
          // },
        }}
      >
        <Typography variant="subtitle2">
          <Link href="/" color="inherit" underline="always" target="_blank">
            Powered by Plynth
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default PowerBar
