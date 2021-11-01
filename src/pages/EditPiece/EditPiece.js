import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  Paper,
} from '@mui/material'
import { Link as LinkIcon } from '@mui/icons-material'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'

import BarEditPiece from 'layouts/BarEditPiece'
import AddMediaButton from './components/AddMediaButton'

const EditPiece = () => {
  const { pieceId } = useParams()
  const {
    selectPack,
    updatePack: updateReduxPack,
    status,
    updateStatus,
  } = usePackStore()
  const reduxPack = selectPack(pieceId)
  const [pack, setPack] = useState(reduxPack)
  const [cardIndex, setCardIndex] = useState(0)
  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState(false)

  const cards = (pack || {}).cards

  useEffect(() => {
    const onPackChange = () => {
      setPack(reduxPack)
    }
    onPackChange()
  }, [reduxPack])

  const updatePack = updatedPack => {
    setPack({ ...pack, ...updatedPack })
    updateReduxPack(updatedPack)
  }

  const handleCardSubmit = values => {
    if (status !== 'loading') {
      let updatedCards = [...pack.cards]
      updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...values }
      // setPack({ ...pack, cards: updatedCards })
      updateReduxPack({ id: pieceId, cards: updatedCards })
    }
  }

  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const setSpinning = () => {
      setIsSpinning(true)
    }
    const stopSpinning = () => {
      setTimeout(() => {
        if (isSpinning === true) {
          setIsSpinning(false)
        }
      }, 500)
    }
    if (updateStatus === 'loading') {
      setSpinning()
    } else {
      stopSpinning()
    }
  }, [updateStatus, isSpinning])

  const handleRemoveClose = () => {
    setRemoveDialogIsOpen(false)
  }

  const handleRemoveOpen = () => {
    setRemoveDialogIsOpen(true)
  }

  const handleDeleteCard = () => {
    const updatedCards = [
      ...cards.slice(0, cardIndex),
      ...cards.slice(cardIndex + 1),
    ]

    setPack({ ...pack, cards: updatedCards })
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1)
    }
    updateReduxPack({ id: pieceId, cards: updatedCards })

    setRemoveDialogIsOpen(false)
  }

  return (
    <>
      <BarEditPiece />
      <AdminNav>
        {pack && (
          <Box
            height="calc(100vh - 96px)"
            width="100%"
            overflow="auto"
            display="flex"
            alignContent="center"
            pb={1}
          >
            <Grid container justifyContent="flex-start">
              <Grid item sm={12} md={7}>
                <Box margin={4}>
                  <Paper>
                    <Box padding={4} pb={1}>
                      <Box
                        display="flex"
                        justifyContent="space-around"
                        alignItems="center"
                      >
                        <AddMediaButton piece={pack} media="image" />
                        <LinkIcon fontSize="large" />
                        <AddMediaButton piece={pack} media="image" />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
              <Grid
                item
                md={5}
                sx={{ display: { xs: 'none', md: 'block' } }}
              ></Grid>
            </Grid>
          </Box>
        )}
      </AdminNav>
      <Dialog
        onClose={handleRemoveClose}
        aria-labelledby="remove-dialog-title"
        open={removeDialogIsOpen}
      >
        <DialogTitle id="remove-dialog-title">Remove Card</DialogTitle>
        <DialogContent>
          Are you sure you want to remove this card? This cannot be undone.
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleRemoveClose}>Cancel</MuiButton>
          <MuiButton onClick={handleDeleteCard}>Remove</MuiButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditPiece
