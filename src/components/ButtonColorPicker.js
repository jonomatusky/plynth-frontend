import React, { useState } from 'react'
import { Box, Button, Popover } from '@material-ui/core'
import { Brush } from '@material-ui/icons'
import { ChromePicker } from 'react-color'

const ButtonColorPicker = ({ color, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [tempColor, setTempColor] = useState(color)

  const handleSelect = (color, event) => {
    onChange(tempColor.hex)
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
      <Button onClick={openPicker} variant="contained">
        <Box height="25px">
          <Brush />
        </Box>
      </Button>
    </>
  )
}

export default ButtonColorPicker
