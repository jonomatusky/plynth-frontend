import React from 'react'
import { Grid, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TextTypography from './TextTypography'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardText = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={10}>
        <Box paddingTop={10}>
          <Typography variant="h4" className={classes.type}>
            {card.title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <TextTypography variant="h5" font={style.font}>
          {card.text}
        </TextTypography>
      </Grid>
      <Grid item xs={12}>
        <Box height="50px" />
      </Grid>
    </Grid>
  )
}

export default CardText
