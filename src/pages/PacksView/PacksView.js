import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  Button as MuiButton,
  CardActionArea,
  CardContent,
} from '@material-ui/core'
import { ArrowForward, Close } from '@material-ui/icons'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import usePackStore from 'hooks/store/use-pack-store'

import AdminNav from 'layouts/AdminNav'
import { cardTypes } from 'components/CardCard'
import CardCard from 'components/CardCard'
import Button from 'components/Button'
import Emoji from 'components/Emoji'

const PacksView = () => {
  const history = useHistory()
  const { packs, status, createPack } = usePackStore()

  const [newPack, setNewPack] = useState(null)
  const [selectedCards, setSelectedCards] = useState([])

  const handleClick = () => {
    setNewPack({})
  }

  const handleCancel = () => {
    setNewPack(null)
  }

  const ViewMyPacks = () => {
    return (
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Box paddingTop={6}>
              <Typography variant="h4" align="center">
                My Packs
              </Typography>
            </Box>
          </Grid>
          {status === 'succeeded' && (packs || []).length === 0 && (
            <Grid item xs={12}>
              <Typography align="center">
                You don't have any packs yet! Create a new one to get started.
              </Typography>
            </Grid>
          )}
          <Grid item xs={8}>
            <Typography align="center">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClick}
              >
                <b>Create New Pack</b>
              </Button>
            </Typography>
          </Grid>
          {(packs || []).length > 0 && (
            <Grid item xs={12} container spacing={2} justify="flex-start">
              {packs.map(pack => {
                return (
                  <Grid item xs={6} key={pack.id}>
                    <Card>
                      <CardActionArea
                        onClick={() =>
                          history.push(`/admin/packs/${pack.id}/edit/cards`)
                        }
                      >
                        <CardContent>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <Typography variant="h5">{pack.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Box minHeight="25px">
                                <Grid container spacing={1} alignItems="center">
                                  {(pack.cards || []).map((card, index) => {
                                    const type = card.type
                                    const cardInfo = cardTypes.find(
                                      cardType => cardType.type === type
                                    )

                                    return (
                                      <Grid item key={card.id || index}>
                                        <Emoji
                                          label={type}
                                          symbol={cardInfo.icon}
                                        />
                                      </Grid>
                                    )
                                  })}
                                </Grid>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })}
            </Grid>
          )}
        </Grid>
      </Container>
    )
  }

  const NameForm = () => {
    const onSubmit = values => {
      setNewPack({ name: values.name })
    }

    const defaultValues = {
      name: '',
    }

    const validationSchema = Yup.object({
      name: Yup.string()
        .max(50, 'A little long there! Keep it under 50 characters')
        .required('Need a name. Bueller?'),
    })

    const { register, handleSubmit, errors } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues,
      shouldUnregister: false,
    })

    return (
      <Container maxWidth="sm">
        <Box paddingTop={12} />
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Name your new pack</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>(You can always change this later)</Typography>
          </Grid>
          <Grid item xs={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="name"
                    label="Name"
                    placeholder="My Awesome Pack"
                    inputRef={register}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                    autoComplete="off"
                    // InputProps={{
                    //   fontSize: 50,
                    // }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="space-between" alignItems="center">
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
                      >
                        <b>Choose your cards</b>
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    )
  }

  const ChooseCards = () => {
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
      console.log(createdPack)
    }

    return (
      <Container maxWidth="sm">
        <Box paddingTop={12} />
        <Grid container justify="center" spacing={4}>
          <Grid item xs={12}>
            <Box paddingBottom={2}>
              <Typography variant="h5" align="center">
                Choose your cards
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={2}>
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
            <Grid container justify="space-between" alignItems="center">
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

  return (
    <AdminNav>
      {newPack && newPack.name && <ChooseCards />}
      {newPack && !newPack.name && <NameForm />}
      {!newPack && <ViewMyPacks />}
    </AdminNav>
  )
}

export default PacksView
