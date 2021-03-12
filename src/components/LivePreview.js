import React from 'react'
import { Container, Box, Grid, Typography } from '@material-ui/core'

const LivePreview = ({ pack, isLoading }) => {
  const cards = (pack || {}).cards

  const card = (cards || [{}])[0]

  return (
    <Box height="600px" width="300px" border={15} borderRadius={40}>
      <Container>
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
      </Container>
    </Box>
  )
}

export default LivePreview
