import React from 'react'

import { Button, styled } from '@material-ui/core'

const CardButton = styled(Button)(props => ({
  // padding: 0,
  minHeight: 0,
  minWidth: 0,
  borderRadius: '50px',
  color: props.buttoncolor,
  border: '2px solid',
  '&:hover': {
    border: '2px solid',
    backgroundColor: `${props.buttoncolor}11`,
    boxShadow: `0px 1px #000`,
  },
}))

const ButtonCard = ({ children, color, ...props }) => {
  return (
    <CardButton
      variant="outlined"
      color="primary"
      buttoncolor={color}
      {...props}
      size="large"
    >
      {children}
    </CardButton>
  )
}

export default ButtonCard
