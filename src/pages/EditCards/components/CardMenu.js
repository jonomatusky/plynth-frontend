import React from 'react'
import { Grid } from '@material-ui/core'

import { usePackStore } from 'hooks/store/use-pack-store'
import CardCard, { cardTypes } from 'components/CardCard'

const CardMenu = ({ packId }) => {
  const { addCard } = usePackStore()

  const handleSelect = cardType => {
    addCard({ id: packId, type: cardType })
  }

  return (
    <Grid container justify="flex-start" spacing={2}>
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
