import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Container, Hidden } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import PackContent from 'components/PackContent'
import PackButtonsMobile from 'components/PackButtonsMobile'
import PackButtonsDesktop from 'components/PackButtonsDesktop'
import PaginationDots from 'components/PaginationDots'
import LogoBar from 'components/LogoBar'
import NotFound from 'components/NotFound'
import PublicNav from 'layouts/PublicNav'

const ViewPack = () => {
  const { packId } = useParams()
  const { request, status } = useRequest()
  const [index, setIndex] = useState(0)
  const [pack, setPack] = useState(null)

  const { style, cards } = pack || {}
  const { fontColor } = style || {}

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

        if ((style || {}).backgroundColor) {
          document.body.style.backgroundColor = style.backgroundColor
        }
      } catch (err) {}
    }
    if (status === 'idle') {
      getPack()
    }
  }, [packId, request, status])

  return pack && pack.isPublic ? (
    <PublicNav>
      <PaginationDots
        count={(cards || []).length}
        index={index}
        color={fontColor}
      />
      <Container disableGutters>
        <PackContent pack={pack} index={index} setIndex={setIndex} />
      </Container>
      <LogoBar color={fontColor} />
      <Hidden smDown>
        <PackButtonsDesktop
          index={index}
          lastIndex={(cards || []).length - 1}
          setIndex={setIndex}
          fontColor={fontColor}
        />
      </Hidden>
      <Hidden smUp>
        <PackButtonsMobile
          index={index}
          lastIndex={(cards || []).length - 1}
          setIndex={setIndex}
          fontColor={fontColor}
        />
      </Hidden>
    </PublicNav>
  ) : (
    <PublicNav>
      {pack && !pack.isPublic && <NotFound />}
      {!pack && <></>}
    </PublicNav>
  )
}

export default ViewPack
