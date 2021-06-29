import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faSpotify,
  faYoutube,
  faApple,
} from '@fortawesome/free-brands-svg-icons'
import { Button } from '@material-ui/core'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
  },
})

const ButtonIconMusicLink = ({ link, color }) => {
  const classes = useStyles()

  const icons = {
    spotify: faSpotify,
    appleMusic: faApple,
    youtube: faYoutube,
    other: faLink,
  }

  return (
    <Button
      target="_blank"
      href={link.url}
      // style={{ color, opacity: '0.90' }}
      classes={classes.buttonRound}
      variant="contained"
      color={color}
    >
      <FontAwesomeIcon icon={icons[link.type] || faLink} size="lg" />
    </Button>
  )
}

export default ButtonIconMusicLink
