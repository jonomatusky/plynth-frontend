import React, { useEffect } from 'react'
import { Box } from '@mui/system'

import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useAlertStore from 'hooks/store/use-alert-store'
import usePackStore from 'hooks/store/use-pack-store'

const EditLayout = ({ isPublic, children }) => {
  const { status } = useUserStore()

  const { status: packStatus } = usePackStore()
  const { setError } = useAlertStore()

  useFetch()
  usePageTrack()

  useEffect(() => {
    if (packStatus === 'failed') {
      setError({
        message: 'Unable to get your packs. Please refresh the page.',
      })
    }
  })
  return (
    <>
      {(status === 'idle' || status === 'loading') && !isPublic && (
        <LoadingScreen backgroundColor={'theme.palette.background.card'} />
      )}
      {(status === 'succeeded' || status === 'failed' || isPublic) && (
        <main>
          {status === 'failed' && !isPublic && (
            <SomethingWentWrong
              backgroundColor="theme.palette.background.default"
              fontColor={'#555555'}
            />
          )}
          {(status === 'succeeded' || isPublic) && (
            <Box display="flex">
              <Box
                height="calc(100vh-48px)"
                mt="48px"
                overflow="hidden"
                flexGrow="1"
              >
                {children}
              </Box>
            </Box>
          )}
        </main>
      )}
    </>
  )
}

export default EditLayout
