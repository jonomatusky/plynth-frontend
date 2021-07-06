import React, { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Grid, Hidden, Box } from '@material-ui/core'

import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import CardHighlight from './CardHighlight'
import CardMusic from './CardMusic'
import CardImage from './CardImage'
import CardButtons from './CardButtons'
import { use100vh } from 'hooks/use-100-vh'
import posthog from 'posthog-js'

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

  useEffect(() => {
    window.history.pushState(null, null, `#card=${index}_${cards[index].id}`)
  }, [index, cards])

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
                  <Hidden mdDown>
                    <Box height="30px" />
                  </Hidden>
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
                {/* temp - adding extra space because live preview screen is still a little too long */}
                {preview && (
                  <Grid item xs={12}>
                    <Box height="75px" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box height="50px" />
                </Grid>
              </Grid>
            </Grid>
          </div>
        )
      })}
    </SwipeableViews>
  )
}

export default PackContent
