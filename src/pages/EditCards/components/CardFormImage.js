import React, { useState, useEffect } from 'react'
import {
  TextField,
  Grid,
  Button as MuiButton,
  // FormControlLabel,
  // Switch,
} from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import CardImage from './CardImageUpload'

const CardFormImage = ({ card, onSubmit, pending, onRemove }) => {
  const [prevCardId, setPrevCardId] = useState(null)
  // const [isFullscreenOnMobile, setIsFullscreenOnMobile ] = useState(card.isFullscreenMobile)

  const { title, text, label, url } = card || {}

  const defaultValues = {
    title: title || '',
    text: text || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
  })

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  //ensures the form is rerendered when the index is changed
  useEffect(() => {
    const setReset = () => {
      setPrevCardId(card.id)
      reset({ title, text, label, url })
    }
    if (card.id && prevCardId !== card.id) {
      setReset()
    }
  })

  useEffect(() => {})

  // const changeFullscreenMobile = () => {
  //   const newCard = { ...card }
  //   newCard.isFullscreenMobile = !card.isFullscreenMobile
  //   onSubmit(newCard)
  // }

  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center">
        <Grid item container xs={12} justifyContent="center">
          <Grid item>
            <CardImage card={card} onSubmit={onSubmit} pending={pending} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="flex-end" spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="title"
                label="Title"
                placeholder="Thanks for the support!"
                inputRef={register}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="text"
                label="Subtitle"
                placeholder="We wanted to give you guys a behind-the-scenes look at..."
                inputRef={register}
                error={Boolean(errors.text)}
                helperText={errors.text?.message}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={card.isFullscreenMobile}
                    onChange={changeFullscreenMobile}
                  />
                }
                label="Make full screen on mobile"
              />
            </Grid> */}
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Grid item>
                <MuiButton
                  endIcon={<DeleteOutline fontSize="small" />}
                  color="primary"
                  size="small"
                  onClick={onRemove}
                >
                  Remove
                </MuiButton>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  pending={pending}
                  size="large"
                >
                  Save Card
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default CardFormImage
