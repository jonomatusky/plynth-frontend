import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Grid, Box } from '@mui/material'

import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import CardHighlight from './CardHighlight'
import CardMusic from './CardMusic'
import CardImage from './CardImage'
import CardButtons from './CardButtons'
import { use100vh } from 'hooks/use-100-vh'

const PackContent = ({ preview, pack, index, setIndex }) => {
  const cards = (pack || {}).cards
  // const card = (cards || [])[index]

  const style = (pack || {}).style

  const gridProps = preview ? { xs: 12 } : { xs: 12, sm: 8, md: 6 }
  const swipeProps = preview ? {} : { enableMouseEvents: true }

  const increment = () => {
    if (index < (cards || []).length - 1) setIndex(index + 1)
  }

  const windowHeight = use100vh()

  return (
    <SwipeableViews
      {...swipeProps}
      index={index}
      onChangeIndex={setIndex}
      containerStyle={{
        height: !preview ? windowHeight : '100%',
      }}
    >
      {(cards || []).map((card, i) => {
        let { type } = card

        return (
          <div
            key={card.id}
            id={'card-' + i}
            style={{
              height: '100%',
              width: '100%',
              flexGrow: 1,
              color: (style || {}).fontColor,
              // background:
              //   card.isFullscreenMobile && card.image
              //     ? `url(${card.imageUrl}) no-repeat center`
              //     : null,
            }}
          >
            <Grid container justifyContent="center">
              <Grid item {...gridProps}>
                {!preview && (
                  <Box
                    height="30px"
                    sx={{ display: { xs: 'none', md: 'block' } }}
                  />
                )}
                {type === 'text' && <CardText card={card} style={style} />}
                {type === 'video' && (
                  <CardVideo
                    card={card}
                    style={style}
                    preview={preview}
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
                  <CardHighlight
                    card={card}
                    style={style}
                    increment={increment}
                  />
                )}
                {type === 'music' && <CardMusic card={card} style={style} />}
                {type === 'image' && (
                  <CardImage card={card} style={style} preview={preview} />
                )}
                {type === 'buttons' && (
                  <CardButtons card={card} style={style} />
                )}
              </Grid>
            </Grid>
          </div>
        )
      })}
    </SwipeableViews>
  )
}

export default PackContent
