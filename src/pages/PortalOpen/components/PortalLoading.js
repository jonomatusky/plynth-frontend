import React from 'react-hook-form'
import { Box, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Div100vh from 'components/Div100vh'

const useStyles = makeStyles({
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  spin: {
    animation: '$spin 2000ms infinite linear',
  },
})

const LoadingIcon = ({ color }) => {
  return (
    <CircularProgress
      sx={{ color: color || 'black' }}
      size={60}
      thickness={5}
    />
  )
}

const PortalLoading = ({ portal }) => {
  const classes = useStyles()

  const { loadingImage, loadingImageUrl, style } = portal || {}
  const { animationColor, animationBackgroundColor } = style || {}

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
        backgroundColor={animationBackgroundColor}
        textAlign="center"
      >
        {loadingImage && (
          <img
            className={classes.spin}
            alt="GroundUp Logo"
            src={loadingImageUrl}
            style={{ width: '150px' }}
          />
        )}
        {!loadingImage && <LoadingIcon color={animationColor} />}
      </Box>
    </Div100vh>
  )
}

export default PortalLoading
