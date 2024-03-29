import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from '@mui/material'
import { ArrowForward, ArrowBack, Add } from '@mui/icons-material'

import usePackStore from 'hooks/store/use-pack-store'
import CardPanel from './components/CardPanel'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/ButtonCircle'
import CardNav from './components/CardNav'
import CardMenu from './components/CardMenu'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'

import { drawerWidth } from 'layouts/AdminNav'
import PreviewLayout from 'layouts/PreviewLayout'

const EditCards = () => {
  const { packId } = useParams()
  const {
    selectPack,
    updatePack: updateReduxPack,
    status,
    updateStatus,
  } = usePackStore()
  const reduxPack = selectPack(packId)
  const [pack, setPack] = useState(reduxPack)
  const [cardIndex, setCardIndex] = useState(0)
  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState(false)

  const cards = (pack || {}).cards
  const currentCard = (cards || [])[cardIndex]

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
      updateReduxPack({ id: packId, cards: updatedCards })
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
    updateReduxPack({ id: packId, cards: updatedCards })

    setRemoveDialogIsOpen(false)
  }

  return (
    <>
      <AdminNav>
        <EditBar>
          {pack && (
            <>
              {cards && cards.length > 0 && (
                <div
                  style={{
                    width: `calc(100vw - ${drawerWidth}px`,
                    position: 'absolute',
                    top: '48px',
                    zIndex: '15',
                  }}
                >
                  <Grid container justifyContent="flex-start">
                    <Grid item sm={12} md={7}>
                      <Box overflow="auto">
                        <Box
                          border={1}
                          borderTop={0}
                          borderLeft={0}
                          borderRight={0}
                          borderColor="divider"
                          paddingLeft={1}
                          overflow="auto"
                        >
                          <CardNav
                            cards={cards}
                            cardIndex={cardIndex}
                            setCardIndex={setCardIndex}
                            updatePack={updatePack}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              )}
              <Grid container justifyContent="flex-start">
                <Grid item sm={12} md={7}>
                  <Box
                    maxHeight={
                      cards && cards.length > 0
                        ? 'calc(100vh - 127px)'
                        : 'calc(100vh - 48px)'
                    }
                    marginTop={cards && cards.length > 0 ? '79px' : '0px'}
                    overflow="auto"
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Box display="flex" alignContent="center" pb={1}>
                              <Grid container justifyContent="center">
                                <Grid item xs={2}>
                                  <Grid container justifyContent="center">
                                    <Box paddingTop={30} position="absolute">
                                      {cardIndex !== 0 && (
                                        <CircleButton
                                          onClick={() =>
                                            setCardIndex(cardIndex - 1)
                                          }
                                        >
                                          <ArrowBack />
                                        </CircleButton>
                                      )}
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      <Box minHeight="24px" />
                                      {pack &&
                                        cardIndex < (cards || []).length && (
                                          <CardPanel
                                            card={currentCard}
                                            onSubmit={handleCardSubmit}
                                            onRemove={handleRemoveOpen}
                                            pending={updateStatus === 'loading'}
                                          />
                                        )}
                                      {pack &&
                                        cardIndex >= (cards || []).length && (
                                          <CardMenu packId={packId} />
                                        )}
                                      {(status === 'loading' ||
                                        status === 'idle') && (
                                        <Grid container justifyContent="center">
                                          <Grid item>
                                            <CircularProgress color="secondary" />
                                          </Grid>
                                        </Grid>
                                      )}
                                      <Box minHeight="24px" />
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={2}>
                                  <Grid container justifyContent="center">
                                    <Box paddingTop={30} position="absolute">
                                      {cardIndex < (cards || []).length && (
                                        <CircleButton
                                          type="submit"
                                          form="card-form"
                                          onClick={() =>
                                            setCardIndex(cardIndex + 1)
                                          }
                                        >
                                          {cardIndex <
                                            (cards || []).length - 1 && (
                                            <ArrowForward />
                                          )}
                                          {cardIndex ===
                                            (cards || []).length - 1 && <Add />}
                                        </CircleButton>
                                      )}
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <PreviewLayout>
                    <Grid container justifyContent="center">
                      <Grid item xs={12} container justifyContent="center">
                        <LivePreview
                          pack={pack}
                          cardIndex={cardIndex}
                          isLoading={updateStatus === 'loading'}
                          setIndex={setCardIndex}
                        />
                      </Grid>
                      <Grid item container xs={12} justifyContent="center">
                        <Box paddingTop={4}>
                          {isSpinning && (
                            <CircularProgress
                              size="1.25rem"
                              color="inherit"
                              thickness={6}
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </PreviewLayout>
                </Grid>
              </Grid>
            </>
          )}
        </EditBar>
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

export default EditCards
