import { Typography, styled } from '@material-ui/core'

const TextTypography = styled(Typography)(props => ({
  fontFamily: props.font,
  whiteSpace: 'pre-line',
  overflowWrap: 'break-word',
}))

export default TextTypography
