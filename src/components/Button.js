import React from 'react'
import { Button as MuiButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  button: {
    borderRadius: '100px',
  },
})

const Button = ({ children, isLoading, color, variant, ...props }) => {
  const classes = useStyles()
  return (
    <MuiButton
      color={'primary' || color}
      variant={'contained' || variant}
      className={classes.button}
      {...props}
    >
      {/* {isLoading ? (
        <CircularProgress size="1.25rem" color="inherit" thickness={6} />
      ) : ( */}
      {children}
      {/* )} */}
    </MuiButton>
  )
}

export default Button
