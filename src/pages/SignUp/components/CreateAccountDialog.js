import React from 'react'
import { Box, Dialog, DialogTitle, DialogContent } from '@mui/material'

import SignUpForm from './SignUpForm'

const CreateAccountDialog = ({ open, onClose }) => {
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
          <b>Sign up for Plynth</b>
        </DialogTitle>

        <DialogContent>
          <SignUpForm />
        </DialogContent>
      </Box>
    </Dialog>
  )
}

export default CreateAccountDialog
