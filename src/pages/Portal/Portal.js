import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import CameraDialog from 'components/CameraDialog'
import usePortalStore from 'hooks/store/use-portal-store'
import LoadingScreen from 'components/LoadingScreen'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import useScanStore from 'hooks/store/use-scan-store'
import PortalContent from './components/PortalContent'
import PortalCamera from 'pages/PortalOpen/components/PortalCamera'
import PublicNav from 'layouts/PublicNav'

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

  const { portal } = portalUser || {}
  const { style } = portal || {}
  const { backgroundColor } = style || {}

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
    <PublicNav>
      {status === 'failed' && <NotFoundPage />}
      {status !== 'succeeded' && status !== 'failed' && <LoadingScreen />}
      {status === 'succeeded' && !portalUser && <NotFoundPage />}
      {status === 'succeeded' && portalUser && (
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
    </PublicNav>
  )
}

export default Portal
