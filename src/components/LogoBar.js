import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '@material-ui/core'

import { ReactComponent as PlynthLogo } from 'images/plynth_logo_black.svg'

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
      <Link to={link || '/'}>
        <Box
          sx={{
            opacity: '0.5',
            // '&:hover': {
            //   opacity: '0.6',
            // },
          }}
        >
          <PlynthLogo
            fill={color}
            style={{
              width: '80vw',
              maxWidth: '80px',
              maxHeight: '30px',
            }}
            alt="Plynth Logo"
          />
        </Box>
      </Link>
    </Box>
  )
}

export default LogoBar
