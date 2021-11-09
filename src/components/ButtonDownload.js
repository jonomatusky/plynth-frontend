import React from 'react'

import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { GetApp } from '@mui/icons-material'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '50%',
    height: '100px',
    width: '100px',
  },
})

const ButtonDownload = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      target="_blank"
      {...props}
      className={classes.buttonRound}
      variant="outlined"
      color="inherit"
    >
      <GetApp fontSize="large" />
    </Button>
  )
}

export default ButtonDownload
