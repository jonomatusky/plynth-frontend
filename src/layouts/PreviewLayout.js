import React from 'react'
import { Box, Typography, Link } from '@mui/material'

import ButtonSharePortal from 'components/ButtonSharePortal'

const { REACT_APP_PUBLIC_URL } = process.env

const PreviewLayout = ({ username, children }) => {
  const portalUrl = REACT_APP_PUBLIC_URL + '/' + username

  return (
    <Box
      borderLeft={1}
      borderColor="divider"
      height="calc(100vh - 48px)"
      paddingTop="24px"
      overflow="hidden"
      position="relative"
    >
      <Box width="100%" mt="48px">
        {children}
      </Box>
      {username && (
        <Box position="absolute" bottom={0} left={0} right={0} zIndex={10}>
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            pb={1}
          >
            <Typography variant="subtitle2">
              <b>Your Portal: </b>
              <Link
                href={portalUrl}
                target="_blank"
                color="inherit"
                underline="always"
              >
                {portalUrl}
              </Link>
            </Typography>
            <ButtonSharePortal url={portalUrl} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default PreviewLayout
