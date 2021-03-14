import React from 'react'
import { Box } from '@material-ui/core'
import CardText from './CardText'
import CardVideo from './CardVideo'
import CardDownload from './CardDownload'

const LivePreview = ({ pack, cardIndex }) => {
  const cards = (pack || {}).cards
  const card = (cards || [])[cardIndex]
  const type = (card || {}).type

  console.log(card)

  return (
    <Box
      height="600px"
      width="300px"
      border={15}
      borderRadius={40}
      bgcolor="divider"
    >
      {type === 'text' && <CardText card={card} />}
      {type === 'video' && <CardVideo card={card} />}
      {type === 'download' && <CardDownload card={card} />}
    </Box>
  )
}

export default LivePreview
