import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'

const CardText = ({ card }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box paddingTop={6}>
          <Typography variant="h5">{card.title}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">{card.text}</Typography>
      </Grid>
    </Grid>
  )
}

export default CardText
