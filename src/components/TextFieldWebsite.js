import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const TextFieldWebsite = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    // background: '#444444',
    // color: 'white',
    fontWeight: 900,
    fontSize: '24px',
  },
  // '& input:valid + fieldset': {
  //   borderColor: 'white',
  //   borderWidth: 0,
  // },
  // '& input:valid:focus + fieldset': {
  //   borderWidth: 0,
  // },
  // '& input:valid:hover + fieldset': {
  //   borderColor: 'white',
  //   borderWidth: 0,
  // },
  // '& input:invalid + fieldset': {
  //   borderColor: 'white',
  //   borderWidth: 0,
  // },
  // '& input:invalid:hover + fieldset': {
  //   borderColor: 'white',
  //   borderWidth: 0,
  // },
})

export default TextFieldWebsite
