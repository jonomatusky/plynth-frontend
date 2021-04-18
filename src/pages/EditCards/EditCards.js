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
  Typography,
  Hidden,
} from '@material-ui/core'
import { ArrowForward, ArrowBack, Add } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'
import CardPanel from './components/CardPanel'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/ButtonCircle'
import CardNav from './components/CardNav'
import CardMenu from './components/CardMenu'
import AdminNav from 'layouts/AdminNav'
import EditBar from 'components/EditBar'

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

  // useEffect(() => {
  //   const packItUp = () => {
  //     const reduxPack = selectPack(packId)
  //     setPack(reduxPack)
  //   }
  //   if (status === 'succeeded' && updateStatus !== 'loading') {
  //     console.log('packing it up')
  //     packItUp()
  //   }
  //   console.log(status)
  //   console.log(updateStatus)
  // }, [packId, selectPack, status, updateStatus])

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
    console.log('opening')
    setRemoveDialogIsOpen(true)
  }

  const handleDeleteCard = () => {
    const updatedCards = [
      ...cards.slice(0, cardIndex),
      ...cards.slice(cardIndex + 1),
    ]

    // setPack({ ...pack, cards: updatedCards })
    updateReduxPack({ id: packId, cards: updatedCards })

    setRemoveDialogIsOpen(false)
  }

  return (
    <AdminNav>
      <EditBar />
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
      <Box height="100vh">
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          style={{ height: `100vh` }}
        >
          <Grid item sm={12} md={8}>
            <Box height="100%">
              <Box minHeight="48px" />
              {cards && cards.length > 0 && (
                <Box
                  height="79px"
                  border={1}
                  borderTop={0}
                  borderLeft={0}
                  borderRight={0}
                  borderColor="divider"
                  // padding={1}
                  paddingLeft={1}
                >
                  <CardNav
                    cards={cards}
                    cardIndex={cardIndex}
                    setCardIndex={setCardIndex}
                    updatePack={updatePack}
                  />
                  {/* TO ADD */}
                  {/* <Grid item xs={1} container justifyContent="center">
                  <Grid item>
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </Grid>
                </Grid> */}
                </Box>
              )}
              <Box
                display="flex"
                alignContent="center"
                overflow="scroll"
                pb={1}
                height="calc(100vh - 75px - 48px)"
              >
                <Grid container justifyContent="center">
                  <Grid item xs={2}>
                    <Grid container justifyContent="center">
                      <Box paddingTop={30} position="absolute">
                        {cardIndex !== 0 && (
                          <CircleButton
                            onClick={() => setCardIndex(cardIndex - 1)}
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

                        {pack && cardIndex < (cards || []).length && (
                          <CardPanel
                            card={currentCard}
                            onSubmit={handleCardSubmit}
                            onRemove={handleRemoveOpen}
                          />
                        )}
                        {pack && cardIndex >= (cards || []).length && (
                          <CardMenu packId={packId} />
                        )}
                        {(status === 'loading' || status === 'idle') && (
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
                        {cardIndex < (cards || []).length - 1 && (
                          <CircleButton
                            onClick={() => setCardIndex(cardIndex + 1)}
                          >
                            <ArrowForward />
                          </CircleButton>
                        )}
                        {cardIndex === (cards || []).length - 1 && (
                          <CircleButton
                            onClick={() => {
                              setCardIndex(cardIndex + 1)
                            }}
                          >
                            <Add />
                          </CircleButton>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Grid item md={4}>
              <Box borderLeft={1} borderColor="divider" height="100%">
                <Box minHeight="96px" />
                <Grid container justifyContent="center">
                  <Grid item xs={12}>
                    <Box paddingBottom={2}>
                      <Typography align="center" color="textSecondary">
                        LIVE PREVIEW
                      </Typography>
                    </Box>
                  </Grid>
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
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </AdminNav>
  )
}

export default EditCards

// const useStyles = makeStyles(theme => ({
//   barPadding: {
//     minHeight: '48px',
//   },
// }))

// const initialState = {
//   cards,
//   cardIndex: 0,
//   currentCard: {},
//   cardType: null,
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'increment':
//       const currentIndex = state.cardIndex
//       return {
//         cards: state.cards,
//         cardIndex: currentIndex + 1,
//         currentCard: state.cards[currentIndex + 1],
//         cardType: state.cards[currentIndex + 1].type,
//       }
//     case 'decrement':
//       return {
//         cards: state.cards,
//         cardIndex: state.cardIndex + 1,
//         currentCard: state.cards[currentIndex - 1],
//         cardType: state.cards[currentIndex - 1].type,
//       }

//     default:
//       throw new Error()
//   }
// }
