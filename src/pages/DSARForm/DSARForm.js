import { Box } from '@mui/system'
import PublicNav from 'layouts/PublicNav'
import React from 'react'
import { use100vh } from 'hooks/use-100-vh'

const DSARForm = () => {
  const height = use100vh()

  return (
    <PublicNav hideFooter>
      <Box height={height - 64} width="100%">
        <iframe
          title="privacy policy"
          height="100%"
          width="100%"
          style={{ border: 0 }}
          src="https://app.termly.io/notify/d39b8a94-3895-4822-b19e-351105820f9f"
        />
      </Box>
    </PublicNav>
  )
}

export default DSARForm
