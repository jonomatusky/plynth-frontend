import React, { useState } from 'react'
import { Grid, Box, Card, CardContent, CardActionArea, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from 'theme'
import {
  GetApp,
  Subject,
  PlayCircleOutline,
  StarBorder,
  Headset,
  Photo,
  Link,
} from '@mui/icons-material'

export const cardTypes = [
  {
    type: 'highlight',
    title: 'Highlight',
    icon: 'star_border',
    description: 'Add an image, link and text.',
  },
  {
    type: 'video',
    title: 'Video',
    icon: 'play_circle_outline',
    description: 'Share a video.',
  },
  {
    type: 'text',
    title: 'Text',
    icon: 'subject',
    description: 'Add a message.',
  },

  {
    type: 'image',
    title: 'Image',
    icon: 'photo',
    description: 'Add an image.',
  },
  {
    type: 'music',
    title: 'Music',
    icon: 'headset',
    description: 'Link to your music.',
  },
  {
    type: 'buttons',
    title: 'Links',
    icon: 'link',
    description: 'Share a list of links.',
  },
  {
    type: 'download',
    title: 'Download',
    icon: 'get_app',
    description: 'Link to a file.',
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
    case 'star_border':
      return <StarBorder fontSize={fontSize} />
    case 'headset':
      return <Headset fontSize={fontSize} />
    case 'photo':
      return <Photo fontSize={fontSize} />
    case 'link':
      return <Link fontSize={fontSize} />
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
                  <Box fontSize="48px">
                    <MuiIcon icon={cardInfo.icon} fontSize="inherit" />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height="30px">
                <Typography variant="h6">{cardInfo.title}</Typography>
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
