import React, { useState } from 'react'
import { Box, Button, Popover } from '@material-ui/core'
import { Palette } from '@material-ui/icons'
import { ChromePicker } from 'react-color'

// const useStyles = makeStyles({
//   root: {
//     backgroundColor: props => props.color,
//     '&:hover': {
//       backgroundColor: props => props.color,
//     },
//   },
// })

const ButtonColorPicker = ({ color, onChange }) => {
  // const classes = useStyles({ color })

  const [anchorEl, setAnchorEl] = useState(null)
  const [tempColor, setTempColor] = useState(color)

  const handleSelect = (color, event) => {
    onChange(color.hex)
  }

  const openPicker = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        <ChromePicker
          disableAlpha
          onChange={setTempColor}
          onChangeComplete={handleSelect}
          color={tempColor}
        />
      </Popover>
      <Button onClick={openPicker} variant="contained" color="secondary">
        <Box height="25px">
          <Palette />
        </Box>
      </Button>
    </>
  )
}

export default ButtonColorPicker
