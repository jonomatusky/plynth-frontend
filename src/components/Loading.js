import React from 'react-hook-form'
import { Box, CircularProgress } from '@mui/material'

const Loading = ({ backgroundColor, color }) => {
  return (
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
  )
}

export default Loading
