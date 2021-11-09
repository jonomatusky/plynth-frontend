import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CircularProgress,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Clear } from '@mui/icons-material'
import { useRequest } from 'hooks/use-request'
import usePackStore from 'hooks/store/use-pack-store'

const Image = styled('div')(props => ({
  background: `url(${props.image}) no-repeat center`,
  backgroundSize: `contain`,
  textAlign: `center`,
  width: `100px`,
  height: `100px`,
}))

const PieceImage = ({ piece }) => {
  const { request, status } = useRequest()
  const { fetchPacks } = usePackStore()
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const handleOpen = () => {
    setDialogIsOpen(true)
  }

  const handleClose = () => {
    setDialogIsOpen(false)
  }

  const handleRemove = async () => {
    try {
      await request({
        url: `/pieces/${piece.id}`,
        method: 'DELETE',
      })
      await setTimeout(() => {
        fetchPacks()
      }, 200)
    } catch (err) {}
    handleClose()
  }

  const { imageUrl } = piece || {}

  return (
    <>
      <Dialog open={dialogIsOpen} onClose={handleClose}>
        <DialogTitle>Are you sure you want to remove this image?</DialogTitle>
        <DialogContent>
          This can't be undone. You will need to add the image again to re-link
          it.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove}>Remove</Button>
        </DialogActions>
      </Dialog>
      <Box mr="12px">
        {status === 'idle' && imageUrl && (
          <>
            <Image image={imageUrl} />
            <Button
              onClick={handleOpen}
              size="small"
              endIcon={<Clear />}
              fullWidth
            >
              Remove
            </Button>
          </>
        )}
        {(status !== 'idle' || !imageUrl) && (
          <Box
            height="100px"
            width="100px"
            bgcolor="action.selected"
            display="flex"
            justifyItems="center"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  )
}

export default PieceImage
