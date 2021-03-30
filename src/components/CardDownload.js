import React from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ButtonDownload from './ButtonDownload'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardDownload = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12}>
        <Box paddingTop={16}>
          <Box minHeight={40}>
            <Typography variant="h4" align="center" className={classes.type}>
              {card.title}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item>
          <ButtonDownload href={card.url} disabled={!card.url} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" className={classes.type}>
          {card.text}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default CardDownload
