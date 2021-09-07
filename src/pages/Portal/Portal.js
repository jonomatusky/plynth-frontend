import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import CameraDialog from 'components/CameraDialog'
import usePortalStore from 'hooks/store/use-portal-store'
import LoadingScreen from 'components/LoadingScreen'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import useScanStore from 'hooks/store/use-scan-store'
import PortalContent from './components/PortalContent'
import PortalCamera from 'pages/PortalOpen/components/PortalCamera'

const Portal = () => {
  const { clearScan } = useScanStore()
  const [testCameraIsOpen, setTestCameraIsOpen] = useState(false)

  const { portalUser, fetchPortal, status, cameraError, setCameraError } =
    usePortalStore()

  let { username } = useParams()
  username = username.toLowerCase()

  useEffect(() => {
    if (!portalUser || portalUser.username !== username) {
      fetchPortal(username)
    }
  }, [fetchPortal, username, portalUser])

  let { portal } = portalUser || {}
  const { style } = portal || {}
  const { backgroundColor } = style || {}

  let { title, text, image, imageUrl, hideBranding } = portalUser || {}

  if (!title && !text && !image && !imageUrl && !hideBranding) {
    title = `Welcome`
    text = `This is @${username}'s portal. Snap a photo of any image they have linked.`
    portal = { title, text }
  }

  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor
    }
  }, [backgroundColor])

  useEffect(() => {
    clearScan()
  }, [clearScan])

  const history = useHistory()

  const handleOpenCamera = () => {
    setTestCameraIsOpen(true)
  }

  const handleUserMedia = () => {
    history.push(`/${portalUser.username}/open`)
  }

  const handleUserMediaError = () => {
    setCameraError(true)
  }

  const handleShowHelpDialog = () => {
    setCameraError(true)
  }

  const handleCloseHelpDialog = () => {
    setCameraError(false)
    setTestCameraIsOpen(false)
  }

  return (
    <>
      {status !== 'succeeded' && status !== 'failed' && <LoadingScreen />}
      {status === 'failed' && <NotFoundPage />}
      {status === 'succeeded' && !portalUser && <NotFoundPage />}
      {/* {status === 'succeeded' && portalUser.tier === 'trial' && (
        <Div100vh>
          <Box
            height="100%"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={11}>
                <Typography variant="h4" color="black" textAlign="center">
                  <b>Coming Soon</b>
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h6" color="black" textAlign="center">
                  This portal has been reserved
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            bottom="0"
            position="absolute"
            top="auto"
            display="flex"
            justifyContent="center"
            paddingBottom="0.25rem"
            left="0"
            right="0"
            zIndex="30"
          >
            <Box
              color={'#000000'}
              sx={{
                opacity: '0.6',
              }}
            >
              <Typography variant="subtitle2">
                <Link
                  href="/"
                  color="inherit"
                  underline="always"
                  target="_blank"
                >
                  Powered by Plynth
                </Link>
              </Typography>
            </Box>
          </Box>
        </Div100vh>
      )} */}
      {status === 'succeeded' && (
        <>
          <CameraDialog
            open={cameraError}
            username="groundup"
            onClose={handleCloseHelpDialog}
          />
          <PortalContent
            portal={portal}
            onOpenCamera={handleOpenCamera}
            showHelpDialog={handleShowHelpDialog}
          />
          {testCameraIsOpen && (
            <PortalCamera
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
            />
          )}
        </>
      )}
    </>
  )
}

export default Portal
