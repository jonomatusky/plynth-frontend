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
import theme from 'theme'
import {
  GetApp,
  Highlight,
  Subject,
  PlayCircleOutline,
} from '@material-ui/icons'

export const cardTypes = [
  {
    type: 'text',
    title: 'Text',
    icon: 'subject',
    description: 'Add a message.',
  },
  {
    type: 'video',
    title: 'Video',
    icon: 'play_circle_outline',
    description: 'Share a video.',
  },
  {
    type: 'download',
    title: 'Download',
    icon: 'get_app',
    description: 'Link to a file.',
  },
  {
    type: 'highlight',
    title: 'Highlight',
    icon: 'highlight',
    description: 'Add an image, link and text.',
  },
]

const useStyles = makeStyles({
  cardButton: {
    backgroundColor: props =>
      props.isSelected ? theme.palette.action.selected : null,
  },
})

const MuiIcon = ({ icon, fontSize }) => {
  switch (icon) {
    case 'subject':
      return <Subject fontSize={fontSize} />
    case 'play_circle_outline':
      return <PlayCircleOutline fontSize={fontSize} />
    case 'get_app':
      return <GetApp fontSize={fontSize} />
    case 'highlight':
      return <Highlight fontSize={fontSize} />
    default:
      return <></>
  }
}

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
              <Box height="70px">
                <Box
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MuiIcon icon={cardInfo.icon} fontSize="large" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height="30px">
                <Typography variant="h5">{cardInfo.title}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height="60px">
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
