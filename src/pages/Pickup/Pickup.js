import React, { useEffect } from 'react'

import useScanStore from 'hooks/store/use-scan-store'
import NotFound from 'components/NotFound'
import Pack from 'components/Pack'
import NoMatch from 'components/NoMatch'

import ScanError from 'components/ScanError'
import LoadingScreen from 'components/LoadingScreen'
import PickupScreen from './components/PickupScreen'

const Pickup = () => {
  const { clearScan, foundPiece, foundPack, error, status } = useScanStore()

  const backgroundColor = 'black'
  const fontColor = 'white'

  const handleClose = () => {
    clearScan()
  }

  const { REACT_APP_LEGACY_URL } = process.env

  useEffect(() => {
    if (status === 'succeeded' && !foundPack && foundPiece) {
      let url

      if (foundPiece.isDirect) {
        url =
          foundPiece.directLink ||
          `${REACT_APP_LEGACY_URL}/${foundPiece.owner.username}`
      } else {
        url = `${REACT_APP_LEGACY_URL}/p/${foundPiece.id}`
      }
      window.location.assign(url)
    }
  }, [foundPack, foundPiece, status, REACT_APP_LEGACY_URL])

  if (error) {
    return <ScanError fontColor={fontColor} onClose={clearScan} />
  } else if (status === 'loading' || (foundPiece && !foundPack)) {
    return <LoadingScreen color="white" />
  } else if (status === 'succeeded' && foundPack && foundPack.isPublic) {
    return <Pack pack={foundPack} />
  } else if (status === 'succeeded' && foundPack && !foundPack.isPublic) {
    return <NotFound />
  } else if (status === 'succeeded' && !foundPiece) {
    return <NoMatch fontColor={fontColor} onClose={handleClose} />
  } else {
    return (
      <PickupScreen fontColor={fontColor} backgroundColor={backgroundColor} />
    )
  }
}

export default Pickup
