import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'

const DangerZone = ({ packId }) => {
  const history = useHistory()
  const { deletePack } = usePackStore()
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  const handleDeleteClose = () => {
    setDeleteDialogIsOpen(false)
  }

  const handleDeleteOpen = () => {
    setDeleteDialogIsOpen(true)
  }

  const handleDeletePack = async () => {
    try {
      await deletePack(packId)
      history.push('/admin/packs')
    } catch (err) {}
  }

  return (
    <>
      <Dialog
        onClose={handleDeleteClose}
        aria-labelledby="remove-dialog-title"
        open={deleteDialogIsOpen}
      >
        <DialogTitle id="remove-dialog-title">Delete Pack</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this pack? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleDeleteClose}>Cancel</MuiButton>
          <MuiButton onClick={handleDeletePack}>DELETE</MuiButton>
        </DialogActions>
      </Dialog>
      <Paper>
        <Box padding={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h6">Danger Zone</Typography>
            </Grid>
            <Grid item xs={12}>
              <MuiButton
                onClick={handleDeleteOpen}
                startIcon={<DeleteOutline />}
              >
                Delete Pack
              </MuiButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}

export default DangerZone
