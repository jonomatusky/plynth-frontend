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
    backgroundColor: '#00000066',
    height: '45px',
    width: '45px',
    position: 'absolute',
    zIndex: '50',
    bottom: theme.spacing(8),
    '&:hover': {
      backgroundColor: '#00000066',
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
      {isLeft && <ArrowBack fontSize="large" aria-label="Previous Card" />}
      {!isLeft && <ArrowForward fontSize="large" aria-label="Next Card" />}
    </Button>
  )
}

export default ButtonPackMobile
