import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Grid, Box, CircularProgress, Typography } from '@material-ui/core'
import { ArrowForward, ArrowBack, Add } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'
import CardPanel from './components/CardPanel'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/ButtonCircle'
import EditBar from 'components/EditBar'
import CardMenu from './components/CardMenu'
import CardNav from './components/CardNav'

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

const PackEdit = () => {
  // const classes = useStyles()
  const { packId } = useParams()
  const { selectPack, updatePack, status, updateStatus } = usePackStore()
  // const [pack, setPack] = useState({})
  const [cardIndex, setCardIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState(null)
  const [cardIndexIsUpdating, setCardIndexIsUpdating] = useState(false)

  // useEffect(() => {
  //   const getPack = () => {
  //     setPack()
  //   }
  //   if (status === 'succeeded') {
  //     getPack()
  //   }
  // },[packId,selectPack,status])

  const pack = selectPack(packId)
  const cards = (pack || {}).cards
  const cardType = (currentCard || {}).type

  useEffect(() => {
    const setCard = () => {
      setCurrentCard((cards || [])[cardIndex])
    }
    if (!cardIndexIsUpdating && updateStatus !== 'loading') {
      console.log('updating card')
      setCard()
    }
  }, [cardIndex, cardIndexIsUpdating, cards, updateStatus])

  const handleCardSubmit = values => {
    if (status !== 'loading') {
      let currentCards = [...pack.cards]
      currentCards[cardIndex] = { type: cardType, ...values }
      let updatedPack = { id: packId, cards: currentCards }
      updatePack(updatedPack)
    }
  }

  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const setSpinning = () => {
      setIsSpinning(true)
    }
    const stopSpinning = () => {
      setTimeout(() => setIsSpinning(false), 1000)
    }
    if (updateStatus === 'loading') {
      setSpinning()
    } else {
      stopSpinning()
    }
  }, [updateStatus])

  console.log('card index is updating: ' + cardIndexIsUpdating)
  console.log('card index: ' + cardIndex)
  console.log(
    'redux card type: ' + (((pack || {}).cards || [])[cardIndex] || {}).type
  )
  console.log('current card type: ' + (currentCard || {}).type)

  return (
    <AdminNav>
      <EditBar />
      <Box height="100vh">
        <Grid
          container
          justify="center"
          alignItems="stretch"
          style={{ height: `100vh` }}
        >
          <Grid item xs={8}>
            <Box minHeight="48px" />
            <Box
              // minHeight="72px"
              border={1}
              borderTop={0}
              borderLeft={0}
              borderRight={0}
              borderColor="divider"
              // padding={1}
              paddingLeft={3}
            >
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Typography>Current Cards:</Typography>
                </Grid>
                <Grid item xs={11}>
                  <CardNav
                    cards={cards}
                    cardIndex={cardIndex}
                    setCardIndex={setCardIndex}
                    setCardIndexIsUpdating={setCardIndexIsUpdating}
                  />
                </Grid>
              </Grid>
            </Box>
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
                {!!currentCard && (
                  <CardPanel card={currentCard} onSubmit={handleCardSubmit} />
                )}
                {!currentCard && status === 'succeeded' && (
                  <CardMenu packId={packId} />
                )}
                {status === 'loading' && (
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
                          console.log('tapped')
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

          <Grid item xs={4}>
            <Box borderLeft={1} borderColor="divider" height="100%">
              <Box minHeight="96px" />
              <Grid container justify="center">
                <Grid item xs={12} container justify="center">
                  <LivePreview pack={pack} cardIndex={cardIndex} />
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
        </Grid>
      </Box>
    </AdminNav>
  )
}

export default PackEdit
