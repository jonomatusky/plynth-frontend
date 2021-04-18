import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faSpotify,
  faYoutube,
  faApple,
} from '@fortawesome/free-brands-svg-icons'
import { IconButton } from '@material-ui/core'

const ButtonIconMusicLink = ({ link }) => {
  const icons = {
    spotify: faSpotify,
    apple_music: faApple,
    youtube: faYoutube,
    other: faLink,
  }

  return (
    <IconButton target="_blank" href={link.url}>
      <FontAwesomeIcon icon={icons[link.type] || faLink} />
    </IconButton>
  )
}

export default ButtonIconMusicLink
