import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'

import SignUpWithCodeForm from './SignUpWithCodeForm'

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
          <b>Accept Invite</b>
        </DialogTitle>

        <DialogContent>
          <SignUpWithCodeForm />
        </DialogContent>
        <DialogActions>
          <Box width="100%">
            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <Button
                sx={{ textTransform: 'none' }}
                component={Link}
                size="small"
                to="/login"
              >
                <b>Sign In</b>
              </Button>
            </Typography>
            <Typography variant="body2" textAlign="center">
              Don't have a code?{' '}
              <Button
                sx={{ textTransform: 'none' }}
                component={Link}
                size="small"
                to="/s/waitlist"
              >
                <b>Join the Waitlist</b>
              </Button>
            </Typography>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default CreateAccountDialog
