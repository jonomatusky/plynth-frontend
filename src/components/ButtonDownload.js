import React from 'react'

import { Button, makeStyles } from '@material-ui/core'

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
      {...props}
      className={classes.buttonRound}
      variant="contained"
      color="primary"
    >
      {children}
    </Button>
  )
}

export default ButtonDownload
