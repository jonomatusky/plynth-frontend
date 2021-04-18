import { Paper, Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

import { cardTypes } from 'components/CardCard'
import CardFormText from './CardFormText'
import CardFormVideo from './CardFormVideo'
import CardFormDownload from './CardFormDownload'
import CardFormHighlight from './CardFormHighlight'
import CardFormMusic from './CardFormMusic'
import CardFormImage from './CardFormImage'

const CardPanel = ({ card, onSubmit, pending, onRemove }) => {
  const type = card.type
  const { title, description } = cardTypes.find(
    cardType => cardType.type === type
  )

  return (
    <Paper>
      <Box p={3}>
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              <b>{title}</b>
            </Typography>
            <Typography>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            {type === 'text' && (
              <CardFormText
                card={card}
                onSubmit={onSubmit}
                pending={pending}
                onRemove={onRemove}
              />
            )}
            {type === 'video' && (
              <CardFormVideo
                card={card}
                onSubmit={onSubmit}
                pending={pending}
                onRemove={onRemove}
              />
            )}
            {type === 'download' && (
              <CardFormDownload
                card={card}
                onSubmit={onSubmit}
                isLoading={pending}
                onRemove={onRemove}
              />
            )}
            {type === 'highlight' && (
              <CardFormHighlight
                card={card}
                onSubmit={onSubmit}
                pending={pending}
                onRemove={onRemove}
              />
            )}
            {type === 'music' && (
              <CardFormMusic
                card={card}
                onSubmit={onSubmit}
                pending={pending}
                onRemove={onRemove}
              />
            )}
            {type === 'image' && (
              <CardFormImage
                card={card}
                onSubmit={onSubmit}
                isLoading={pending}
                onRemove={onRemove}
                pending={pending}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CardPanel
