import React from 'react'

import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ArrowForward, ArrowBack } from '@mui/icons-material'
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
  return <>
    <IconButton
      color="secondary"
      {...props}
      className={classes.buttonRound}
      variant="outlined"
      id={isLeft ? 'previous-card' : 'next-card'}
      size="large">
      {isLeft && <ArrowBack fontSize="large" aria-label="Previous Card" />}
      {!isLeft && <ArrowForward fontSize="large" aria-label="Next Card" />}
    </IconButton>
  </>;
}

export default ButtonPackDesktop
