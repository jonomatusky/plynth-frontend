import React from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardText = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={11}>
        <Box paddingTop={12}>
          <Typography variant="h4" className={classes.type}>
            {card.title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={11}>
        <Typography variant="h5" className={classes.type}>
          {card.text}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CardText
