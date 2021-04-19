import React from 'react'

import { Button, makeStyles } from '@material-ui/core'
import { ArrowForward, ArrowBack } from '@material-ui/icons'
import theme from 'theme'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '50%',
    border: '2px solid',
    color: props => props.color,
    height: '50px',
    width: '50px',
    position: 'fixed',
    bottom: theme.spacing(8),
    '&:hover': {
      border: '2px solid',
    },
    right: props => !props.isLeft && theme.spacing(1),
    left: props => props.isLeft && theme.spacing(1),
  },
})

const ButtonPackMobile = ({ children, isLeft, color, ...props }) => {
  const classes = useStyles({ isLeft, color })

  return (
    <Button
      color="secondary"
      {...props}
      className={classes.buttonRound}
      variant="outlined"
    >
      {isLeft && <ArrowBack fontSize="large" />}
      {!isLeft && <ArrowForward fontSize="large" />}
    </Button>
  )
}

export default ButtonPackMobile
