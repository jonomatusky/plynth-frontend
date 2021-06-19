import React from 'react'
import { Box, Button, makeStyles } from '@material-ui/core'
import { Block } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
})

const ButtonColorButtons = ({ color, onChange }) => {
  const classes = useStyles({ color })

  const setColor = () => {
    onChange(null)
  }

  return (
    <Button
      onClick={setColor}
      variant="contained"
      classes={{ root: classes.root }}
    >
      <Box height="25px">
        <Block htmlColor="black" />
      </Box>
    </Button>
  )
}

export default ButtonColorButtons
