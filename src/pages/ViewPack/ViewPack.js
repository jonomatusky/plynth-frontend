import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Container, Hidden } from '@material-ui/core'

import { useRequest } from 'hooks/use-request'
import PackContent from 'components/PackContent'
import PackButtonsMobile from 'components/PackButtonsMobile'
import PackButtonsDesktop from 'components/PackButtonsDesktop'

const ViewPack = () => {
  const { packId } = useParams()
  const { request, status } = useRequest()
  const [index, setIndex] = useState(0)
  const [pack, setPack] = useState({})

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

  return (
    <Container disableGutters style={{ minHeight: '100vh' }}>
      <PackContent pack={pack} index={index} setIndex={setIndex} />
      <Hidden smUp>
        <PackButtonsMobile
          index={index}
          lastIndex={(cards || []).length - 1}
          setIndex={setIndex}
          fontColor={fontColor}
        />
      </Hidden>
      <Hidden smDown>
        <PackButtonsDesktop
          index={index}
          lastIndex={(cards || []).length - 1}
          setIndex={setIndex}
          fontColor={fontColor}
        />
      </Hidden>
    </Container>
  )
}

export default ViewPack
