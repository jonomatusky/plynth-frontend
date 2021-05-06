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
    // border: '2px solid',
    // color: props => props.color,
    backgroundColor: '#00000077',
    height: '45px',
    width: '45px',
    position: 'fixed',
    bottom: theme.spacing(8),
    '&:hover': {
      backgroundColor: '#00000077',
    },
    right: props => !props.isLeft && theme.spacing(1),
    left: props => props.isLeft && theme.spacing(1),
  },
})

const ButtonPackMobile = ({ children, isLeft, color, ...props }) => {
  const classes = useStyles({ isLeft, color })

  return (
    <Button
      // color="primary"
      variant="contained"
      {...props}
      className={classes.buttonRound}
      disableElevation
    >
      {isLeft && <ArrowBack fontSize="large" />}
      {!isLeft && <ArrowForward fontSize="large" />}
    </Button>
  )
}

export default ButtonPackMobile
