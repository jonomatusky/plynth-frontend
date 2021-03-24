import React from 'react'

import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '10px',
    height: '100px',
    width: '100px',
  },
})

const ButtonUpload = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={classes.buttonRound}
      variant="contained"
      color="primary"
    >
      <Grid container>
        <Grid item xs={12}>
          <AddAPhoto fontSize="large" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">Add Image</Typography>
        </Grid>
      </Grid>
    </Button>
  )
}

export default ButtonUpload
