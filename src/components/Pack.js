import React, { useEffect, useState } from 'react'

import { Container, Box } from '@mui/material'
import PackButtonsDesktop from './PackButtonsDesktop'
import PackButtonsMobile from './PackButtonsMobile'
import PackContent from './PackContent'
import PaginationDots from './PaginationDots'
import posthog from 'posthog-js'

const Pack = ({ pack }) => {
  const [index, setIndex] = useState(0)

  const { style, cards } = pack || {}
  const { fontColor } = style

  if (pack && pack.isPublic) {
    if ((style || {}).backgroundColor) {
      document.body.style.backgroundColor = style.backgroundColor
    }
  }

  useEffect(() => {
    posthog.capture('Found Pack', { 'Pack Id': pack.id })
  }, [pack.id])

  useEffect(() => {
    window.history.replaceState(
      null,
      null,
      `#pack=${pack.id}&card=${index}_${(cards[index] || {}).id}`
    )
    posthog.capture('$pageview')
  }, [index, cards, pack.id])

  return (
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
  )
}

export default Pack
