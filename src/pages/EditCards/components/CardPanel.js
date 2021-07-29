import React from 'react'
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button as MuiButton,
} from '@material-ui/core'

import { cardTypes } from 'pages/EditCards/components/CardCard'
import { DeleteOutline } from '@material-ui/icons'
import CardForm from './CardForm'

const CardPanel = ({ card, onSubmit, pending, onRemove }) => {
  const type = card.type
  const { title, description } = cardTypes.find(
    cardType => cardType.type === type
  )

  return (
    <Paper>
      <Box pt={2} pb={1} pl={3} pr={3}>
        <Grid container justifyContent="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              <b>{title}</b>
            </Typography>
            <Typography>{description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12}>
                <CardForm card={card} onSubmit={onSubmit} />
              </Grid>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <MuiButton
                    endIcon={<DeleteOutline fontSize="small" />}
                    color="secondary"
                    size="small"
                    onClick={onRemove}
                  >
                    Remove
                  </MuiButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CardPanel
