import * as React from 'react'
import { alpha, styled } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'

const TextFieldWebsite = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    background: '#444444',
    color: 'white',
    fontWeight: 900,
    fontSize: '24px',
  },
  '& input:valid + fieldset': {
    borderColor: 'white',
    borderWidth: 0,
  },
  '& input:valid:focus + fieldset': {
    borderWidth: 0,
  },
  '& input:valid:hover + fieldset': {
    borderColor: 'white',
    borderWidth: 0,
  },
  '& input:invalid + fieldset': {
    borderColor: 'white',
    borderWidth: 0,
  },
  '& input:invalid:hover + fieldset': {
    borderColor: 'white',
    borderWidth: 0,
  },
})

export default TextFieldWebsite
