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
  makeStyles,
} from '@material-ui/core'
import { ArrowForward, ArrowBack, Add } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'
import CardPanel from './components/CardPanel'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/ButtonCircle'
import EditBar from 'components/EditBar'
import CardNav from './components/CardNav'
import CardMenu from './components/CardMenu'

const drawerWidth = 70

const useStyles = makeStyles({
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
})

const EditCards = () => {
  const classes = useStyles()
  const { packId } = useParams()
  const {
    selectPack,
    updatePack: updateReduxPack,
    status,
    updateStatus,
  } = usePackStore()
  // const [pack, setPack] = useState({})
  const [pack, setPack] = useState(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [removeDialogIsOpen, setRemoveDialogIsOpen] = useState(false)

  // useEffect(() => {
  //   const getPack = () => {
  //     setPack()
  //   }
  //   if (status === 'succeeded') {
  //     getPack()
  //   }
  // },[packId,selectPack,status])

  const cards = (pack || {}).cards
  const currentCard = (cards || [])[cardIndex]

  useEffect(() => {
    const packItUp = () => {
      const reduxPack = selectPack(packId)
      setPack(reduxPack)
    }
    if (status === 'succeeded' && updateStatus !== 'loading') {
      packItUp()
    }
  }, [packId, selectPack, status, updateStatus])

  const updatePack = updatedPack => {
    setPack({ ...pack, ...updatedPack })
    updateReduxPack(updatedPack)
  }

  const handleCardSubmit = values => {
    if (status !== 'loading') {
      let updatedCards = [...pack.cards]
      updatedCards[cardIndex] = { ...updatedCards[cardIndex], ...values }
      setPack({ ...pack, cards: updatedCards })
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

    setPack({ ...pack, cards: updatedCards })
    updateReduxPack({ id: packId, cards: updatedCards })

    setRemoveDialogIsOpen(false)
  }

  return (
    <div className={classes.content}>
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
          justify="center"
          alignItems="stretch"
          style={{ height: `100vh` }}
        >
          <Grid item sm={12} md={8}>
            <Box minHeight="48px" />
            {cards && (
              <Box
                // minHeight="72px"
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
                {/* <Grid item xs={1} container justify="center">
                  <Grid item>
                    <IconButton>
                      <ChevronRight />
                    </IconButton>
                  </Grid>
                </Grid> */}
              </Box>
            )}

            <Box minHeight="48px" />
            <Grid container justify="center">
              <Grid item xs={2}>
                <Grid container justify="center">
                  <Box paddingTop={30}>
                    {cardIndex !== 0 && (
                      <CircleButton onClick={() => setCardIndex(cardIndex - 1)}>
                        <ArrowBack />
                      </CircleButton>
                    )}
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={8}>
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
                  <Grid container justify="center">
                    <Grid item>
                      <CircularProgress color="secondary" />
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center">
                  <Box paddingTop={30}>
                    {cardIndex < (cards || []).length - 1 && (
                      <CircleButton onClick={() => setCardIndex(cardIndex + 1)}>
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
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <Box borderLeft={1} borderColor="divider" height="100%">
                <Box minHeight="96px" />
                <Grid container justify="center">
                  <Grid item xs={12}>
                    <Box paddingBottom={2}>
                      <Typography align="center" color="textSecondary">
                        LIVE PREVIEW
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} container justify="center">
                    <LivePreview
                      pack={pack}
                      cardIndex={cardIndex}
                      isLoading={updateStatus === 'loading'}
                      setIndex={setCardIndex}
                    />
                  </Grid>
                  <Grid item container xs={12} justify="center">
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
    </div>
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
