import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Grid, Box } from '@material-ui/core'

import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import CardHighlight from './CardHighlight'
import CardMusic from './CardMusic'
import CardImage from './CardImage'
import CardButtons from './CardButtons'

const LivePreviewContent = ({ pack, index, setIndex, height }) => {
  const cards = (pack || {}).cards
  // const card = (cards || [])[index]

  const style = (pack || {}).style

  const increment = () => {
    if (index < (cards || []).length - 1) setIndex(index + 1)
  }

  console.log(height)

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
          <div
            key={card.id}
            style={{
              height: '100%',
              width: '100%',
              overflow: 'scroll',
              flexGrow: 1,
              color: (style || {}).fontColor,
              // background:
              //   card.isFullscreenMobile && card.image
              //     ? `url(${card.imageUrl}) no-repeat center`
              //     : null,
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
            <Grid item xs={12}>
              <Box height="75px" />
            </Grid>
            <Grid item xs={12}>
              <Box height="50px" />
            </Grid>
          </div>
        )
      })}
    </SwipeableViews>
  )
}

export default LivePreviewContent
