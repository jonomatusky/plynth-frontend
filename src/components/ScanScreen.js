import React, { useEffect } from 'react'
import { Box } from '@material-ui/core'
import Div100vh from 'components/Div100vh'
import ScanWindow from './ScanWindow'

const ScanScreen = ({
  backgroundColor,
  onUserMediaError,
  onUserMedia,
  hasUserMedia,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor
    }
  }, [backgroundColor])

  return (
    <Div100vh width="100%">
      <Box position="absolute" zIndex="0" width="100%" height="100%">
        <ScanWindow
          onUserMedia={onUserMedia}
          onUserMediaError={onUserMediaError}
          hasUserMedia={hasUserMedia}
        >
          {children}
        </ScanWindow>
      </Box>
    </Div100vh>
  )
}

export default ScanScreen