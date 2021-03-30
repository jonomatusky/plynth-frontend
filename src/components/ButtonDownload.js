import React from 'react'

import { Button, makeStyles } from '@material-ui/core'
import { GetApp } from '@material-ui/icons'

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
