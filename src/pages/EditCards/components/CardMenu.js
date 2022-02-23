import React from 'react'
import { Grid, Typography, Box } from '@mui/material'

import { usePackStore } from 'hooks/store/use-pack-store'
import CardCard, { cardTypes } from 'pages/EditCards/components/CardCard'

const CardMenu = ({ pack, setIndex }) => {
  const { addCard } = usePackStore()

  const handleSelect = cardType => {
    addCard({ id: pack.id, type: cardType })
    if (cardType === 'ar' || cardType === 'ir') {
      setIndex(0)
    }
  }

  return (
    <Grid container justifyContent="flex-start" spacing={2}>
      <Grid item xs={12}>
        <Box paddingBottom={1}>
          <Typography variant="h5">Add an Element</Typography>
        </Box>
        <Box paddingBottom={2}>
          <Typography>Choose an element to add to your experience.</Typography>
        </Box>
      </Grid>
      {cardTypes
        .filter(cardType => {
          if (
            (pack.cards || []).length > 0 &&
            (pack.cards[0].type === 'ar' || pack.cards[0].type === 'ir')
          ) {
            return cardType.type !== 'ar' && cardType.type !== 'ir'
          } else {
            return true
          }
        })
        .map((cardType, index) => {
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
