import { Typography, styled } from '@mui/material'

const TextTypography = styled(Typography)(props => ({
  fontFamily: props.font,
  whiteSpace: 'pre-line',
  overflowWrap: 'break-word',
}))

export default TextTypography
