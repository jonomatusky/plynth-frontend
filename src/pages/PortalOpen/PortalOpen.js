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
import useAlertStore from 'hooks/store/use-alert-store'
import PortalFull from './components/PortalFull'
import { useFetch } from 'hooks/use-fetch'
import ARPack from 'pages/ViewPack/components/ARPack'

const PortalOpen = () => {
  const {
    portalUser,
    scanCount,
    status: portalStatus,
    fetchPortal,
    setCameraError,
  } = usePortalStore()
  const { foundPack, error, status: scanStatus } = useScanStore()

  useFetch()
  usePageTrack()

  const { error: alertError, clearError } = useAlertStore()

  useEffect(() => {
    if (alertError) {
    }
  }, [alertError, clearError])

  const { username } = useParams()

  useEffect(() => {
    const fetchPortalUser = async () => {
      try {
        await fetchPortal(username)
      } catch (err) {
        clearError()
      }
    }

    if (!portalUser || portalUser.username !== username) {
      fetchPortalUser()
    } else {
      window.history.replaceState(null, null, `/${username}/open`)
    }
  }, [portalUser, fetchPortal, username, clearError])

  const { portal } = portalUser || {}
  const { style, instructions } = portal || {}
  const { fontColor, backgroundColor } = style || {}

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

  console.log('user scan limit: ' + portalUser.scanLimit)
  console.log('scan count: ' + scanCount)

  if (portalStatus === 'failed') {
    return <NotFoundPage />
  } else if (!portalUser) {
    return <LoadingScreen />
  } else if (error) {
    return <ScanError fontColor={fontColor} onClose={handleClose} />
  } else if (portalUser.scanLimit <= scanCount) {
    return <PortalFull portalUser={portalUser} onClose={handleClose} />
  } else if (scanStatus === 'loading') {
    return <ProfileLoading portal={portal} />
  } else if (scanStatus === 'succeeded' && foundPack && foundPack.isPublic) {
    return (
      <>
        {(foundPack.cards[0] || {}).type !== 'ar' ? (
          <Pack pack={foundPack} />
        ) : (
          <ARPack pack={foundPack} />
        )}
      </>
    )
  } else if (scanStatus === 'succeeded' && foundPack && !foundPack.isPublic) {
    return <NoMatch fontColor={fontColor} onClose={handleClose} />
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
        portal={username}
      />
    )
  }
}

export default PortalOpen
