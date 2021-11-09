import React from 'react'

import {
  Button,
  Typography,
  Box,
  CircularProgress,
  styled,
} from '@mui/material'

import theme from '../theme'

const StyledButton = styled(Button)({
  borderRadius: '50px',
  padding: '0.6em',
  paddingRight: '1.5rem',
  paddingLeft: '1.5rem',
  backgroundImage: `linearGradient(
      90deg,
      ${theme.palette.primary.main},
      #920748
    )`,
  minHeight: '2.75rem',
})

const ButtonText = styled(Typography)({
  fontSize: '1.2em',
  letterSpacing: '1px',
})

const ActionButton = props => {
  const { fullWidth, label, variant, loading, onClick, ...other } = props

  if (variant === 'text') {
    return (
      <Button fullWidth={fullWidth} variant={variant} onClick={onClick} {...other}>
        <Box>
          <ButtonText>
            <strong>{label}</strong>
          </ButtonText>
        </Box>
      </Button>
    );
  } else {
    return (
      <StyledButton
        color={variant && variant === 'text' ? 'default' : 'primary'}
        fullWidth={fullWidth === false ? false : true}
        variant={variant || 'contained'}
        disableRipple={props.loading}
        onClick={!loading ? onClick : null}
        {...other}
      >
        {!loading && (
          <Box>
            <ButtonText align="center">
              <strong>{label}</strong>
            </ButtonText>
          </Box>
        )}
        {loading && (
          <CircularProgress size="1.25rem" color="inherit" thickness={6} />
        )}
      </StyledButton>
    )
  }
}

export default ActionButton
