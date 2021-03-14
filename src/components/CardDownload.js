import React from 'react'
import { Grid, Box, Typography, Container } from '@material-ui/core'
import ButtonDownload from './ButtonDownload'

const CardDownload = ({ card }) => {
  return (
    <Container>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12}>
          <Box paddingTop={6}>
            <Typography variant="h5" align="center">
              {card.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <ButtonDownload href={card.url} disabled={!card.url} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {card.text}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CardDownload
