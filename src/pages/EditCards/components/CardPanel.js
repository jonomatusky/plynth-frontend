import { Paper, Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

import { cardTypes } from 'components/CardCard'
import CardFormText from './CardFormText'
import CardFormVideo from './CardFormVideo'
import CardFormDownload from './CardFormDownload'

const CardPanel = ({ card, onSubmit, isLoading }) => {
  const type = card.type
  const { title, description } = cardTypes.find(
    cardType => cardType.type === type
  )

  return (
    <Paper>
      <Box p={3} minHeight="500px">
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {description}
          </Grid>
          <Grid item xs={12}>
            {type === 'text' && (
              <CardFormText
                card={card}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            )}
            {type === 'video' && (
              <CardFormVideo
                card={card}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            )}
            {type === 'download' && (
              <CardFormDownload
                card={card}
                onSubmit={onSubmit}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CardPanel
