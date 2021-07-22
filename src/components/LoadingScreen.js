import React from 'react-hook-form'
import { Box, CircularProgress } from '@material-ui/core'

import Div100vh from 'components/Div100vh'

const LoadingScreen = ({ backgroundColor, color }) => {
  return (
    <Div100vh width="100%">
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex="20"
        backgroundColor={backgroundColor || 'black'}
        textAlign="center"
      >
        <CircularProgress sx={{ color: color }} />
      </Box>
    </Div100vh>
  )
}

export default LoadingScreen
