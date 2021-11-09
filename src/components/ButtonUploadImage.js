import React from 'react'

import { Button, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AddAPhoto } from '@mui/icons-material'

const useStyles = makeStyles({
  buttonRound: {
    // padding: 0,
    minHeight: 0,
    minWidth: 0,
    borderRadius: '0px',
    height: '150px',
    width: '150px',
  },
})

const ButtonUploadImage = ({ children, ...props }) => {
  const classes = useStyles()

  return (
    <Button
      className={classes.buttonRound}
      variant="outlined"
      color="secondary"
      {...props}
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
