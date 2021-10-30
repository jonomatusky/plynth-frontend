import React from 'react'

import { Button } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
  },
})

const ButtonCircle = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={classes.buttonRound}
      variant="contained"
      color="primary"
    >
      {children}
    </Button>
  )
}

export default ButtonCircle
