import React from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import ReactPlayer from 'react-player'
import TextTypography from './TextTypography'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardText = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Grid container spacing={3} justifyContent="flex-start">
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Box paddingTop={12} width="100%">
              <Typography variant="h4" className={classes.type}>
                {card.title}
              </Typography>
            </Box>
          </Grid>
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
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={10}>
          <TextTypography variant="h5" font={style.font}>
            {card.text}
          </TextTypography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CardText
