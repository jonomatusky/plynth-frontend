import React from 'react'

import { IconButton, makeStyles } from '@material-ui/core'
import { ArrowForward, ArrowBack } from '@material-ui/icons'
import theme from 'theme'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    // minHeight: 0,
    // minWidth: 0,
    // borderRadius: '50%',
    // border: '2px solid',
    color: props => props.color,
    height: '60px',
    width: '60px',
    position: 'absolute',
    top: '50vh',
    // '&:hover': {
    //   border: '2px solid',
    // },
    right: props => !props.isLeft && theme.spacing(1),
    left: props => props.isLeft && theme.spacing(1),
  },
})

const ButtonPackDesktop = ({ children, isLeft, color, ...props }) => {
  const classes = useStyles({ isLeft, color })
  return (
    <>
      <IconButton
        color="secondary"
        {...props}
        className={classes.buttonRound}
        variant="outlined"
        id={isLeft ? 'previous-card' : 'next-card'}
      >
        {isLeft && <ArrowBack fontSize="large" />}
        {!isLeft && <ArrowForward fontSize="large" />}
      </IconButton>
    </>
  )
}

export default ButtonPackDesktop
