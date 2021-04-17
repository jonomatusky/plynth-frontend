import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Container,
  Box,
  Grid,
  Typography,
  Button as MuiButton,
} from '@material-ui/core'
import { ArrowForward, Close } from '@material-ui/icons'

import { cardTypes } from 'components/CardCard'
import CardCard from 'components/CardCard'
import Button from 'components/Button'

const ChooseCards = (newPack, createPack, handleCancel) => {
  const history = useHistory()

  const [selectedCards, setSelectedCards] = useState([])

  const handleSelect = card => {
    let sCards = selectedCards
    const cardIndex = sCards.findIndex(sCard => sCard.type === card.type)
    if (cardIndex > -1) {
      sCards.splice(cardIndex, 1)
    } else {
      sCards.push(card)
    }
    setSelectedCards(sCards)
  }

  const handleSubmit = async () => {
    const pack = newPack
    pack.cards = selectedCards
    const createdPack = await createPack(pack)
    if (createdPack.id) {
      history.push(`admin/packs/${createdPack.id}/edit/cards`)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box paddingTop={12} />
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12}>
          <Box paddingBottom={2}>
            <Typography variant="h5" align="center">
              Choose your cards
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="flex-start" spacing={2}>
            {cardTypes.map((cardType, index) => {
              return (
                <Grid item xs={6} md={4} key={index}>
                  <CardCard type={cardType.type} onSelect={handleSelect} />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid item>
                <MuiButton
                  onClick={handleCancel}
                  variant="text"
                  startIcon={<Close />}
                  size="small"
                >
                  Cancel
                </MuiButton>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                onClick={handleSubmit}
              >
                <b>Create Your Pack</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ChooseCards
