import React from 'react'
import { Box } from '@material-ui/core'

const PreviewLayout = ({ children }) => {
  return (
    <Box
      borderLeft={1}
      borderColor="divider"
      height="calc(100vh - 48px)"
      paddingTop="24px"
      overflow="hidden"
    >
      <Box width="100%" mt="48px">
        {children}
      </Box>
    </Box>
  )
}

export default PreviewLayout
