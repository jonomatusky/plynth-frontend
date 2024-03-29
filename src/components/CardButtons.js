import React from 'react'
import { Grid, Box, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ButtonSquareIconLink from './ButtonSquareIconLink'

const useStyles = makeStyles({
  type: {
    fontFamily: props => props.font,
  },
})

const CardButtons = ({ card, style }) => {
  const classes = useStyles(style)

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={11}>
        <Box paddingTop={10}>
          <Typography variant="h4" className={classes.type} textAlign="center">
            {card.title}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={11} container justifyContent="center">
        <Box maxWidth="275px">
          <Grid
            container
            spacing={2}
            justifyContent={
              (card.links || []).length === 1 ? 'center' : 'flex-start'
            }
          >
            {(card.links || []).map(link => {
              return (
                <Grid
                  item
                  xs={6}
                  key={link.id}
                  container
                  justifyContent="center"
                >
                  <Grid item>
                    <ButtonSquareIconLink style={style} link={link} />
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box height="50px" />
      </Grid>
    </Grid>
  )
}

export default CardButtons
