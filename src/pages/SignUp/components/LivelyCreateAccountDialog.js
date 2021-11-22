import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent } from '@mui/material'

import LivelySignUpForm from './LivelySignUpForm'

const LivelyCreateAccountDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      transitionDuration={0}
      // sx={{
      //   backdropFilter: 'blur(3px)',
      // }}
    >
      <Box pt={2} pb={1}>
        <DialogTitle sx={{ fontSize: 28 }}>
          <b>Create your account</b>
        </DialogTitle>

        <DialogContent>
          <LivelySignUpForm />
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default LivelyCreateAccountDialog
