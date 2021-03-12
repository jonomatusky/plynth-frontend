import { Paper, Box, Grid, Typography } from '@material-ui/core'
import React from 'react'

const CardPanel = ({ title, description, children }) => {
  return (
    <Paper>
      <Box p={3}>
        <Grid container justify="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            {description}
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default CardPanel
