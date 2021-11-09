import React from 'react-hook-form'
import { Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles';

import Div100vh from 'components/Div100vh'
import GroundUPLogo from '../images/groundup-logo.png'

const useStyles = makeStyles({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  spin: {
    animation: '$spin 2000ms infinite linear',
  },
})

const GroundUpLoading = () => {
  const classes = useStyles()

  return (
    <Div100vh width="100%">
      <Box
        height="100%"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex="20"
        backgroundColor="black"
        textAlign="center"
      >
        <img
          className={classes.spin}
          alt="GroundUp Logo"
          src={GroundUPLogo}
          style={{ width: '150px' }}
        />
      </Box>
    </Div100vh>
  )
}

export default GroundUpLoading
