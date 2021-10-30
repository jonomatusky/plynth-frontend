import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
// import { Close } from '@mui/icons-material'

const OnboardingTooltip = ({ open, onClose, children, title, ...props }) => {
  return (
    <Tooltip
      disableHoverListener
      open={open}
      title={
        <Box width="150px">
          <Typography>{title}</Typography>
          {/* <Box display="flex" justifyContent="flex-end">
            <Button
              size="small"
              endIcon={<Close />}
              onClick={onClose}
              color="inherit"
            >
              Skip
            </Button>
          </Box> */}
        </Box>
      }
      arrow
      {...props}
    >
      {children}
    </Tooltip>
  )
}

export default OnboardingTooltip
