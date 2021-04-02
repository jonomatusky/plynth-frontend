import React from 'react'
import { makeStyles } from '@material-ui/core'
import LoadingButton from '@material-ui/lab/LoadingButton'

const useStyles = makeStyles({
  button: {
    borderRadius: '100px',
  },
})

const Button = ({ children, pending, color, variant, onClick, ...props }) => {
  const classes = useStyles()
  return (
    <LoadingButton
      pending={pending}
      color={color || 'primary'}
      variant={variant || 'contained'}
      className={classes.button}
      onClick={!pending ? onClick : null}
      {...props}
    >
      {children}
    </LoadingButton>
  )
}

export default Button
