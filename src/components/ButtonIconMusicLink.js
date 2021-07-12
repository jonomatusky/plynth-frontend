import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import {
  faSpotify,
  faYoutube,
  faApple,
} from '@fortawesome/free-brands-svg-icons'
import { Button, styled } from '@material-ui/core'

const MusicButton = styled(({ children, style, link, ...props }) => {
  return (
    <Button
      target="_blank"
      href={link.url}
      variant="contained"
      {...props}
      disableElevation
    >
      {children}
    </Button>
  )
})(({ style }) => ({
  // padding: 0,
  height: '64px',
  width: '64px',
  borderRadius: '50px',
  backgroundColor: (style || {}).buttonColor || `${(style || {}).fontColor}cc`,
  color:
    (style || {}).buttonFontColor ||
    ((style || {}).fontColor === '#ffffff' ? '#000000' : '#ffffff'),
  '&:hover': {
    backgroundColor: `${
      (style || {}).buttonColor || (style || {}).fontColor
    }99`,
    boxShadow: `0px 1px #000`,
  },
}))

const ButtonIconMusicLink = ({ link, style }) => {
  const icons = {
    spotify: faSpotify,
    appleMusic: faApple,
    youtube: faYoutube,
    other: faLink,
  }

  return (
    <MusicButton style={style} link={link}>
      <FontAwesomeIcon
        icon={icons[link.type] || faLink}
        size="2x"
        color={style.buttonFontColor}
      />
    </MusicButton>
  )
}

export default ButtonIconMusicLink
