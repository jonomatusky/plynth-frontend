import React from 'react'

import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { AddAPhoto } from '@material-ui/icons'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '0px',
    height: '200px',
    width: '200px',
  },
})

const ButtonUploadImage = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      {...props}
      className={classes.buttonRound}
      variant="outlined"
      color="secondary"
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

export default ButtonUploadImage
