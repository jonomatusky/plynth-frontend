import React from 'react'
import { styled, TextField } from '@material-ui/core'

const WebsiteTextField = styled(props => (
  <TextField
    color="website"
    variant="outlined"
    InputLabelProps={{
      sx: { color: 'white' },
      shrink: true,
    }}
    inputProps={{
      sx: { color: 'white' },
    }}
    {...props}
  />
))({
  '& input:valid + fieldset': {
    borderColor: 'white',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'white',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: 'white',
  },
  '& input:valid:hover + fieldset': {
    borderColor: 'white',
  },
})

export default WebsiteTextField
