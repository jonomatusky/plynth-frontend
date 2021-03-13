import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'

const CardText = ({ card }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} container justify="center">
        <Grid item xs={10}>
          <Box paddingTop={12}>
            <Typography variant="h6">{card.title}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
          <ReactPlayer
            light
            url={card.url}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Grid item xs={10}>
          <Box paddingTop={12}>
            <Typography>{card.text}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardText
