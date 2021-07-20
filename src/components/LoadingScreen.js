import React from 'react-hook-form'
import { Box, CircularProgress } from '@material-ui/core'

import Div100vh from 'components/Div100vh'
import PublicNav from 'layouts/PublicNav'

const LoadingScreen = ({ backgroundColor, color }) => {
  return (
    <PublicNav>
      <Div100vh width="100%">
        <Box
          height="100%"
          width="100vw"
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
    </PublicNav>
  )
}

export default LoadingScreen
