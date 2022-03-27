import React from 'react'
import { Box } from '@mui/material'

import { ReactComponent as LeafletLogo } from 'images/leaflet_logo_black.svg'

const LogoBar = ({ link, color }) => {
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
    >
      <Box
        sx={{
          opacity: '0.6',
          // '&:hover': {
          //   opacity: '0.6',
          // },
        }}
      >
        <LeafletLogo
          fill={color}
          style={{
            width: '80vw',
            maxWidth: '80px',
            maxHeight: '30px',
          }}
          alt="Leaflet Logo"
        />
      </Box>
    </Box>
  )
}

export default LogoBar
