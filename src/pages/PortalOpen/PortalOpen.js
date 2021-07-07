import LoadingScreen from 'components/LoadingScreen'
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage'
import NoMatch from 'components/NoMatch'
import ProfileLoading from './components/PortalLoading'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import usePortalStore from 'hooks/store/use-portal-store'
import ScanError from 'components/ScanError'
import { useHistory } from 'react-router-dom'
import Pack from 'components/Pack'
import useScanStore from 'hooks/store/use-scan-store'
import PortalCamera from './components/PortalCamera'
import usePageTrack from 'hooks/use-page-track'

const PortalOpen = () => {
  const {
    portalUser,
    status: portalStatus,
    fetchPortal,
    setCameraError,
  } = usePortalStore()
  const { foundPack, error, status: scanStatus } = useScanStore()

  usePageTrack()

  const { username } = useParams()

  useEffect(() => {
    if (!portalUser || portalUser.username !== username) {
      fetchPortal(username)
      window.history.replaceState(null, null, `/${username}/open`)
    }
  }, [portalUser, fetchPortal, username])

  const { portal } = portalUser || {}
  const { style, instructions } = portal || {}
  const { fontColor, backgroundColor } = style || {}

  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor
    }
  }, [backgroundColor])

  const history = useHistory()

  const handleClose = () => {
    history.push(`/${portalUser.username}`)
  }

  const [hasUserMedia, setHasUserMedia] = useState(false)

  const handleUserMedia = () => {
    setCameraError(false)
    setHasUserMedia(true)
  }

  const handleUserMediaError = () => {
    history.push(`/${portalUser.username}`)
    setCameraError(true)
  }

  if (portalStatus === 'failed') {
    return <NotFoundPage />
  } else if (!portalUser) {
    return <LoadingScreen />
  } else if (error) {
    return <ScanError fontColor={fontColor} onClose={handleClose} />
  } else if (scanStatus === 'loading') {
    return <ProfileLoading portal={portal} />
  } else if (scanStatus === 'succeeded' && foundPack && foundPack.isPublic) {
    return <Pack pack={foundPack} />
  } else if (scanStatus === 'succeeded' && foundPack && !foundPack.isPublic) {
    return <NotFoundPage />
  } else if (scanStatus === 'succeeded' && !foundPack) {
    return <NoMatch fontColor={fontColor} onClose={handleClose} />
  } else {
    return (
      <PortalCamera
        onUserMedia={handleUserMedia}
        onUserMediaError={handleUserMediaError}
        hasUserMedia={hasUserMedia}
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        instructions={instructions}
        onClose={handleClose}
      />
    )
  }
}

export default PortalOpen
