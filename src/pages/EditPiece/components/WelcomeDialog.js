import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material'

import { Close } from '@mui/icons-material'

const WelcomeDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" transitionDuration={0}>
      <DialogTitle>
        <Box width="100%" display="flex" justifyContent="space-between" mt={2}>
          <Box>Welcome to Plynth</Box>
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
      <DialogContent>
        <Box p={3} width="100%">
          <Grid container>
            <Grid item xs={12}>
              <Typography>Plynth makes it easy...</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Step 1</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Step 2</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Step 3</Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default WelcomeDialog
