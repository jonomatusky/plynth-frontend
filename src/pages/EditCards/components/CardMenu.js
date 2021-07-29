import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'

import { usePackStore } from 'hooks/store/use-pack-store'
import CardCard, { cardTypes } from 'pages/EditCards/components/CardCard'

const CardMenu = ({ packId }) => {
  const { addCard } = usePackStore()

  const handleSelect = cardType => {
    addCard({ id: packId, type: cardType })
  }

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12}>
        <Box paddingBottom={1}>
          <Typography variant="h5">Add a card </Typography>
        </Box>
        <Box paddingBottom={2}>
          <Typography>What kind of content would you like to add?</Typography>
        </Box>
      </Grid>
      {cardTypes.map((cardType, index) => {
        return (
          <Grid item xs={4} md={6} lg={4} key={index}>
            <CardCard
              type={cardType.type}
              onSelect={() => handleSelect(cardType.type)}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CardMenu
