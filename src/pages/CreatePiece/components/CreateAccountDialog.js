import React, { useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
} from '@mui/material'

import { Close } from '@mui/icons-material'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

const CreateAccountDialog = ({ open, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(true)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>
        <Box width="100%" display="flex" justifyContent="space-between" mt={2}>
          <Box>
            {isSignUp ? <b>Get started with Plynth</b> : <b>Sign In</b>}
          </Box>
          <Box>
            <Button
              onClick={onClose}
              variant="secondary"
              sx={{ padding: 0, minWidth: 0 }}
            >
              <Close />
            </Button>
          </Box>
        </Box>
      </DialogTitle>

      <Box pl={3} pr={3}>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
      </Box>
      <DialogActions>
        <Box width="100%">
          {isSignUp ? (
            <Typography variant="body2" textAlign="center">
              Already have an account?{' '}
              <Button
                sx={{ textTransform: 'none' }}
                onClick={() => setIsSignUp(false)}
              >
                <b>Sign In</b>
              </Button>
            </Typography>
          ) : (
            <Typography variant="body2" textAlign="center">
              Don't have an account?{' '}
              <Button
                sx={{ textTransform: 'none' }}
                onClick={() => setIsSignUp(true)}
              >
                <b>Sign Up</b>
              </Button>
            </Typography>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default CreateAccountDialog
