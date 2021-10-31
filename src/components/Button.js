import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import LoadingButton from '@mui/lab/LoadingButton'

const useStyles = makeStyles({
  button: {
    borderRadius: '100px',
  },
})

const Button = ({ children, loading, color, variant, onClick, ...props }) => {
  const classes = useStyles()
  return (
    <LoadingButton
      loading={loading}
      color={color || 'primary'}
      variant={variant || 'contained'}
      className={classes.button}
      onClick={!loading ? onClick : null}
      {...props}
    >
      {children}
    </LoadingButton>
  )
}

export default Button
