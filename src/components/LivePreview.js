import React from 'react'
import { Box, Hidden } from '@material-ui/core'
import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'
import ButtonPage from './ButtonPage'

const LivePreview = ({ pack, cardIndex, isLoading, setIndex }) => {
  // const [index, setIndex] = useState(0)

  const cards = (pack || {}).cards
  const card = (cards || [])[cardIndex]
  const type = (card || {}).type

  const Content = () => {
    return (
      <>
        {type === 'text' && <CardText card={card} />}
        {type === 'video' && <CardVideo card={card} />}
        {type === 'download' && <CardDownload card={card} />}
        {cardIndex !== 0 && (
          <ButtonPage isLeft onClick={() => setIndex(cardIndex - 1)} />
        )}
        {cardIndex < (cards || []).length - 1 && (
          <ButtonPage isLeft={false} onClick={() => setIndex(cardIndex + 1)} />
        )}
      </>
    )
  }

  return (
    <>
      <Hidden mdDown>
        <Box
          width="300px"
          height="600px"
          border={15}
          borderRadius={40}
          bgcolor="divider"
          position="relative"
        >
          <Content />
        </Box>
      </Hidden>
      <Hidden lgUp>
        <Box
          width="250px"
          height="475px"
          border={12}
          borderRadius={35}
          bgcolor="divider"
          position="relative"
        >
          <Content />
        </Box>
      </Hidden>
    </>
  )
}

export default LivePreview
