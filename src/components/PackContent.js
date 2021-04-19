import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Grid, Hidden, Box } from '@material-ui/core'

import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import CardHighlight from './CardHighlight'
import CardMusic from './CardMusic'
import CardImage from './CardImage'

const PackContent = ({ preview, pack, index, setIndex }) => {
  const cards = (pack || {}).cards
  // const card = (cards || [])[index]

  const style = (pack || {}).style

  const gridProps = preview ? { xs: 12 } : { xs: 12, sm: 8, md: 6 }
  const swipeProps = preview ? {} : { enableMouseEvents: true }

  const increment = () => {
    if (index < (cards || []).length - 1) setIndex(index + 1)
  }

  return (
    <SwipeableViews
      {...swipeProps}
      index={index}
      onChangeIndex={setIndex}
      containerStyle={{ minHeight: '100vh' }}
    >
      {(cards || []).map(card => {
        let { type } = card

        return (
          <div
            key={card.id}
            style={{
              height: '100vh',
              width: '100%',
              flexGrow: 1,
              color: (style || {}).fontColor,
              background:
                card.isFullscreenMobile && card.image
                  ? `url(${card.imageUrl}) no-repeat center`
                  : null,
            }}
          >
            <Grid container justifyContent="center">
              <Grid item {...gridProps}>
                {!preview && (
                  <Hidden mdDown>
                    <Box height="5vh" />
                  </Hidden>
                )}
                {type === 'text' && <CardText card={card} style={style} />}
                {type === 'video' && <CardVideo card={card} style={style} />}
                {type === 'download' && (
                  <CardDownload card={card} style={style} />
                )}
                {type === 'highlight' && (
                  <CardHighlight
                    card={card}
                    style={style}
                    increment={increment}
                  />
                )}
                {type === 'music' && <CardMusic card={card} style={style} />}
                {type === 'image' && <CardImage card={card} style={style} />}
                {/* temp - adding extra space because live preview screen is still a little too long */}
                {preview && (
                  <Grid item xs={12}>
                    <Box height="75px" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box height="125px" />
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
