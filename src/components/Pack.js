import React, { useState } from 'react'

import { Container, Hidden } from '@material-ui/core'
import PublicNav from 'layouts/PublicNav'
import PackButtonsDesktop from './PackButtonsDesktop'
import PackButtonsMobile from './PackButtonsMobile'
import PackContent from './PackContent'
import PaginationDots from './PaginationDots'

const Pack = ({ pack }) => {
  const [index, setIndex] = useState(0)

  const { style, cards } = pack || {}
  const { fontColor } = style

  if (pack && pack.isPublic) {
    if ((style || {}).backgroundColor) {
      document.body.style.backgroundColor = style.backgroundColor
    }
  }

  return (
    <PublicNav>
      <PaginationDots
        count={(cards || []).length}
        index={index}
        setIndex={setIndex}
        color={fontColor}
      />
      <Container disableGutters maxWidth={false}>
        <PackContent pack={pack} index={index} setIndex={setIndex} />
      </Container>
      <Hidden smDown>
        <PackButtonsDesktop
          index={index}
          lastIndex={(cards || []).length - 1}
          setIndex={setIndex}
          fontColor={fontColor}
        />
      </Hidden>
      <Hidden smUp>
        {!(cards[index] || {}).hideButtons && (
          <PackButtonsMobile
            index={index}
            setIndex={setIndex}
            lastIndex={(cards || []).length - 1}
            fontColor={(style || {}).fontColor}
          />
        )}
      </Hidden>
    </PublicNav>
  )
}

export default Pack
