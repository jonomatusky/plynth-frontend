import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import AdminNav from 'layouts/AdminNav'

import usePackStore from 'hooks/store/use-pack-store'
import { Grid, Box, CircularProgress } from '@material-ui/core'
import { ArrowForward, ArrowBack } from '@material-ui/icons'

import CardPanelText from './components/CardPanelText'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/CircleButton'
import EditBar from 'components/EditBar'

// const useStyles = makeStyles(theme => ({
//   barPadding: {
//     minHeight: '48px',
//   },
// }))

const PackEdit = () => {
  // const classes = useStyles()
  const { packId } = useParams()
  const { selectPack, updatePack, status, updateStatus } = usePackStore()
  // const [pack, setPack] = useState({})
  const [cardIndex, setCardIndex] = useState(0)

  console.log(cardIndex)

  // useEffect(() => {
  //   const getPack = () => {
  //     setPack()
  //   }
  //   if (status === 'succeeded') {
  //     getPack()
  //   }
  // },[packId,selectPack,status])

  const pack = selectPack(packId)
  const currentCard = ((pack || {}).cards || [])[cardIndex]
  const cardType = (currentCard || {}).type

  const handleCardSubmit = values => {
    if (status !== 'loading') {
      let cards = [...pack.cards]
      cards[cardIndex] = { type: cardType, ...values }
      let updatedPack = { id: packId, cards }
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
            <Box minHeight="96px" />
            <Grid container justify="center">
              <Grid item xs={2}>
                <Grid container justify="center">
                  <Box paddingTop={30}>
                    <CircleButton>
                      <ArrowBack onClick={() => setCardIndex(cardIndex - 1)} />
                    </CircleButton>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={8}>
                {cardType === 'text' && (
                  <CardPanelText
                    card={currentCard}
                    onSubmit={handleCardSubmit}
                  />
                )}
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="center">
                  <Box paddingTop={30}>
                    <CircleButton>
                      <ArrowForward
                        onClick={() => setCardIndex(cardIndex + 1)}
                      />
                    </CircleButton>
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
                  <LivePreview
                    pack={pack}
                    isLoading={updateStatus === 'loading'}
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

            <Grid item xs={12}></Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminNav>
  )
}

export default PackEdit
