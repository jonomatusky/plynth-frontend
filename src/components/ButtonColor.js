import React from 'react'
import { Box, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    backgroundColor: props => props.color,
    '&:hover': {
      backgroundColor: props => props.color,
    },
  },
})

const ButtonColor = ({ color, setColor }) => {
  const classes = useStyles({ color })

  return (
    <Button
      onClick={() => setColor(color)}
      variant="contained"
      classes={{ root: classes.root }}
    >
      <Box height="25px"></Box>
    </Button>
  )
}

export default ButtonColor
