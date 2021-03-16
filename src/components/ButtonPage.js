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
    height: '40px',
    width: '40px',
    position: 'absolute',
    bottom: theme.spacing(6),
    right: props => !props.isLeft && theme.spacing(1),
    left: props => props.isLeft && theme.spacing(1),
  },
})

const ButtonPage = ({ children, isLeft, ...props }) => {
  const classes = useStyles({ isLeft })

  return (
    <>
      <Button
        {...props}
        className={classes.buttonRound}
        variant="outlined"
        color="default"
      >
        {isLeft && <ArrowBack />}
        {!isLeft && <ArrowForward />}
      </Button>
    </>
  )
}

export default ButtonPage
