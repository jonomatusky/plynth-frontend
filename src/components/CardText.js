import React from 'react'
import { Grid, Box, Typography, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardText = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box paddingTop={6}>
            <Typography variant="h5" className={classes.type}>
              {card.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.type}>
            {card.text}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CardText
