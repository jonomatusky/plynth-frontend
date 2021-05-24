import React from 'react'

import { Button, styled, Typography } from '@material-ui/core'

const CardButton = styled(({ children, style, ...props }) => {
  return (
    <Button variant="outlined" color="primary" size="large" {...props}>
      {children}
    </Button>
  )
})(({ style }) => ({
  // padding: 0,
  minHeight: 0,
  minWidth: 0,
  borderRadius: '50px',
  color: style.fontColor,
  border: '2px solid',
  '&:hover': {
    border: '2px solid',
    backgroundColor: `${style.fontColor}11`,
    boxShadow: `0px 1px #000`,
  },
}))

const CardButtonContained = styled(({ children, style, ...props }) => {
  return (
    <Button variant="contained" color="primary" size="large" {...props}>
      {children}
    </Button>
  )
})(({ style }) => ({
  // padding: 0,
  minHeight: 0,
  minWidth: 0,
  borderRadius: '50px',
  backgroundColor: style.buttonColor,
  '&:hover': {
    backgroundColor: `${style.buttonColor}`,
    boxShadow: `0px 1px #000`,
  },
}))

const ColorText = styled(({ cardStyle, children, ...rest }) => (
  <Typography {...rest}>{children}</Typography>
))(({ cardStyle }) => ({
  color: cardStyle.buttonFontColor || cardStyle.fontColor,
}))

const ButtonCard = ({ children, ...props }) => {
  if (props.style?.buttonColor) {
    return (
      <CardButtonContained {...props}>
        <ColorText cardStyle={props.style}>{children}</ColorText>
      </CardButtonContained>
    )
  } else {
    return <CardButton {...props}>{children}</CardButton>
  }
}

export default ButtonCard
