import { Box, styled } from '@material-ui/core'
import theme from 'theme'

export const SectionLight = styled(Box)({
  heigh: '100%',
  width: '100%',
  color: theme.palette.background.default,
  backgroundColor: 'white',
})

export const SectionDark = styled(SectionLight)({
  color: 'white',
  backgroundColor: theme.palette.background.card,
})
