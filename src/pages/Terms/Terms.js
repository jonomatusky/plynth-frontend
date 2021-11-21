import { Box } from '@mui/system'
import PublicNav from 'layouts/PublicNav'
import React from 'react'
import { use100vh } from 'hooks/use-100-vh'

const Terms = () => {
  const height = use100vh()

  return (
    <PublicNav hideFooter>
      <Box height={height - 64} width="100%">
        <iframe
          title="privacy policy"
          height="100%"
          width="100%"
          style={{ border: 0 }}
          src="https://app.termly.io/document/terms-of-use-for-website/2e47d76d-271c-4c63-9698-62fbf4d14707"
        />
      </Box>
    </PublicNav>
  )
}

export default Terms
