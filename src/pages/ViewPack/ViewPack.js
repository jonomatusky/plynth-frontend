import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Container, Box } from '@mui/material'

import { useRequest } from 'hooks/use-request'
import PackContent from 'components/PackContent'
import PackButtonsMobile from 'components/PackButtonsMobile'
import PackButtonsDesktop from 'components/PackButtonsDesktop'
import PaginationDots from 'components/PaginationDots'
import NotFound from 'components/NotFound'
import LoadingScreen from 'components/LoadingScreen'
import usePageTrack from 'hooks/use-page-track'
import { useFetch } from 'hooks/use-fetch'
import ARPack from './components/ARPack'

const ViewPack = () => {
  const { packId } = useParams()
  const { request, status } = useRequest()
  const [index, setIndex] = useState(0)
  const [pack, setPack] = useState(null)

  const { style, cards } = pack || {}
  const { fontColor } = style || {}

  useFetch()
  usePageTrack()

  useEffect(() => {
    const getPack = async () => {
      try {
        const response = await request({
          url: `/packs/${packId}`,
          method: 'GET',
        })
        const { pack } = response || {}
        setPack(pack)

        const { style } = pack || {}

        if (pack && pack.isPublic && pack.shareWithLink) {
          if ((style || {}).backgroundColor) {
            document.body.style.backgroundColor = style.backgroundColor
          }
        }
      } catch (err) {}
    }
    if (status === 'idle') {
      getPack()
    }
  }, [packId, request, status])

  return (
    <>
      {(status === 'idle' || status === 'loading') && <LoadingScreen />}
      {status === 'failed' && <NotFound />}
      {status === 'succeeded' && !pack && <NotFound />}
      {status === 'succeeded' &&
        (!(pack || {}).isPublic || !(pack || {}).shareWithLink) && <NotFound />}
      {status === 'succeeded' && pack && pack.isPublic && pack.shareWithLink && (
        <>
          {(pack.cards[0] || {}).type !== 'ar' && (
            <>
              <PaginationDots
                count={(cards || []).length}
                index={index}
                setIndex={setIndex}
                color={fontColor}
              />
              <Container disableGutters maxWidth={false}>
                <PackContent pack={pack} index={index} setIndex={setIndex} />
              </Container>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PackButtonsDesktop
                  index={index}
                  lastIndex={(cards || []).length - 1}
                  setIndex={setIndex}
                  fontColor={fontColor}
                />
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                {!(cards[index] || {}).hideButtons && (
                  <PackButtonsMobile
                    index={index}
                    setIndex={setIndex}
                    lastIndex={(cards || []).length - 1}
                    fontColor={(style || {}).fontColor}
                  />
                )}
              </Box>
            </>
          )}
          {(pack.cards[0] || {}).type === 'ar' && <ARPack pack={pack} />}
        </>
      )}
    </>
  )
}

export default ViewPack
