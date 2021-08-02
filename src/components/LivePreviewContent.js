import React, { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'

import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import CardHighlight from './CardHighlight'
import CardMusic from './CardMusic'
import CardImage from './CardImage'
import CardButtons from './CardButtons'
import { Box } from '@material-ui/core'

const LivePreviewContent = ({ pack, index, setIndex, height }) => {
  const cards = (pack || {}).cards
  // const card = (cards || [])[index]

  const style = (pack || {}).style

  const increment = () => {
    if (index < (cards || []).length - 1) setIndex(index + 1)
  }

  useEffect(() => {
    window.history.replaceState(
      null,
      null,
      `#card=${index}_${(cards[index] || {}).id || ''}`
    )
  }, [index, cards])

  return (
    <SwipeableViews
      index={index}
      onChangeIndex={setIndex}
      height="100%"
      overflow="hidden"
      containerStyle={{
        height: height,
      }}
    >
      {(cards || []).map((card, i) => {
        let { type } = card

        return (
          <Box
            key={card.id}
            height="100%"
            width="100%"
            flexGrow={1}
            color={(style || {}).fontColor}
            overflow="auto"
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            {type === 'text' && <CardText card={card} style={style} />}
            {type === 'video' && (
              <CardVideo
                card={card}
                style={style}
                preview={true}
                currentIndex={i}
                cardIndex={index}
              />
            )}
            {type === 'download' && (
              <CardDownload
                packId={pack.id}
                cardIndex={index}
                card={card}
                style={style}
              />
            )}
            {type === 'highlight' && (
              <CardHighlight card={card} style={style} increment={increment} />
            )}
            {type === 'music' && <CardMusic card={card} style={style} />}
            {type === 'image' && (
              <CardImage card={card} style={style} preview={true} />
            )}
            {type === 'buttons' && <CardButtons card={card} style={style} />}
            {/* temp - adding extra space because live preview screen is still a little too long */}
          </Box>
        )
      })}
    </SwipeableViews>
  )
}

export default LivePreviewContent
