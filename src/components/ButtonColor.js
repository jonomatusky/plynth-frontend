import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    background: props => props.color,
  },
})

const ColorButton = ({ color, setColor }) => {
  const classes = useStyles({ color })

  const handleClick = () => {
    setColor(color)
  }

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      classes={{ root: classes.root }}
    >
      {' '}
    </Button>
  )
}

export default ColorButton
