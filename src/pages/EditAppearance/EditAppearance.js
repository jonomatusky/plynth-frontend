import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {
  Grid,
  Box,
  CircularProgress,
  Paper,
  Button as MuiButton,
  Typography,
  Hidden,
} from '@material-ui/core'
import { ArrowForward, ArrowBack, Add } from '@material-ui/icons'

import usePackStore from 'hooks/store/use-pack-store'
import AdminNav from 'layouts/AdminNav'
import LivePreview from 'components/LivePreview'
import CircleButton from 'components/ButtonCircle'
import EditBar from 'components/EditBar'
import ColorButton from 'components/ButtonColor'

const EditAppearance = () => {
  // const classes = useStyles()
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
          <Grid item sm={12} md={8}>
            <Box minHeight="48px" />

            <Box minHeight="48px" />
            <Grid container justify="center">
              <Grid item xs={12} sm={8}>
                <Paper>
                  <Box padding={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h4">Edit Appearance</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h5">Background</Typography>
                      </Grid>
                      <Grid item xs={12} container>
                        <Grid item>
                          <ColorButton
                            color={
                              'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
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
    </AdminNav>
  )
}

export default EditAppearance
