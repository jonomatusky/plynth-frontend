import React from 'react'
import { Grid, Box, Typography, Container } from '@material-ui/core'
import ButtonDownload from './ButtonDownload'

const CardDownload = ({ card }) => {
  return (
    <Container>
      <Grid container spacing={6} justify="center">
        <Grid item xs={12}>
          <Box paddingTop={12}>
            <Box minHeight={40}>
              <Typography variant="h5" align="center">
                {card.title}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Grid item>
            <ButtonDownload href={card.url} disabled={!card.url} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">{card.text}</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CardDownload
