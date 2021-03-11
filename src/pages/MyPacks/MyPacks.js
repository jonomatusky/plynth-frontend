import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
} from '@material-ui/core'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import AdminNav from 'layouts/AdminNav'
import { cardTypes } from 'components/CardCard'
import CardCard from 'components/CardCard'

const Home = () => {
  const [newPack, setNewPack] = useState({ name: 'Testing' })
  const [selectedCards, setSelectedCards] = useState([])

  console.log(newPack)

  const handleClick = () => {
    setNewPack({})
  }

  const handleCancel = () => {
    setNewPack(null)
  }

  const ViewMyPacks = packs => {
    return (
      <Container maxWidth="xs">
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleCancel} color="">
                  Cancel X
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h5">Name your new pack</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box paddingBottom={3}>
              <Typography variant="h4" align="center">
                My Packs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
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
        .max(50, 'Enter a name under 50 characters')
        .required('Required'),
    })

    const { register, handleSubmit, errors } = useForm({
      mode: 'onBlur',
      resolver: yupResolver(validationSchema),
      defaultValues,
      shouldUnregister: false,
    })

    return (
      <Container maxWidth="md">
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleCancel}>Cancel X</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h5">Name your new pack</Typography>
            </Box>
          </Grid>
          <Grid item>
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
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
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
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Start Building
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
      console.log(selectedCards)
    }

    const handleSubmit = () => {
      const pack = newPack
      pack.cards = selectedCards
      // createPack(pack)
    }

    return (
      <Container maxWidth="sm">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleCancel}>Cancel X</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box paddingBottom={3}>
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
          <Grid item container justify="center" xs={12}>
            <Grid item>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                <b>Create New Pack</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  }

  const Content = () => {
    if ((newPack || {}).name) {
      return <ChooseCards />
    } else if (newPack) {
      return <NameForm />
    } else {
      return <ViewMyPacks />
    }
  }

  return (
    <AdminNav>
      <Content />
    </AdminNav>
  )
}

export default Home
