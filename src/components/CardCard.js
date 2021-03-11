import React, { useState } from 'react'
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  makeStyles,
} from '@material-ui/core'
import Emoji from './Emoji'
import theme from 'theme'

export const cardTypes = [
  {
    type: 'text',
    title: 'Text',
    icon: '📝',
    description: 'Test test test test test test test test test test test test ',
  },
  { type: 'video', title: 'Video', icon: '🎥', description: 'Test test' },
  { type: 'download', title: 'Download', icon: '⬇️', description: 'Test test' },
]

const useStyles = makeStyles({
  cardButton: {
    backgroundColor: props =>
      props.isSelected ? theme.palette.action.selected : null,
  },
})

const CardCard = ({ type, onSelect }) => {
  const [isSelected, setIsSelected] = useState(null)
  const classes = useStyles({ isSelected })
  const cardInfo = cardTypes.find(cardType => cardType.type === type)

  const handleSelect = () => {
    const card = { type: cardInfo.type }
    setIsSelected(!isSelected)
    onSelect(card)
  }

  return (
    <Card className={classes.cardButton} elevation={isSelected ? 0 : 2}>
      <CardActionArea centerRipple={true} onClick={handleSelect}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box height="100px">
                <Box
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography variant="h2" align="center">
                    <Emoji label={type} symbol={cardInfo.icon} />
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height="30px">
                <Typography variant="h5">{cardInfo.title}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height="70px">
                <Typography>{cardInfo.description}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardCard
