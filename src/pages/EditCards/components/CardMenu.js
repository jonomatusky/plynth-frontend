import React from 'react'
import { Grid, Typography, Box } from '@material-ui/core'

import { usePackStore } from 'hooks/store/use-pack-store'
import CardCard, { cardTypes } from 'components/CardCard'

const CardMenu = ({ packId }) => {
  const { addCard } = usePackStore()

  const handleSelect = cardType => {
    addCard({ id: packId, type: cardType })
  }

  return (
    <Grid container justify="flex-start" spacing={2}>
      <Grid item xs={12}>
        <Box paddingBottom={3}>
          <Typography variant="h5">
            What kind of card would you like to add?
          </Typography>
        </Box>
      </Grid>
      {cardTypes.map((cardType, index) => {
        return (
          <Grid item xs={6} md={4} key={index}>
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
