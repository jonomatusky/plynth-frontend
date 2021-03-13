import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'
import CardText from './CardText'

const LivePreview = ({ pack, cardIndex }) => {
  const cards = (pack || {}).cards
  const card = (cards || [])[cardIndex]
  const type = (card || {}).type

  console.log(card)

  return (
    <Box height="600px" width="300px" border={15} borderRadius={40}>
      <Container>{type === 'text' && <CardText card={card} />}</Container>
    </Box>
  )
}

export default LivePreview
