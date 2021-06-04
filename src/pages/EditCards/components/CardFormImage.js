import React, { useState, useEffect } from 'react'
import {
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  // FormControlLabel,
  // Switch,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import CardImage from './CardImageUpload'
import { useSession } from 'hooks/use-session'

const CardFormImage = ({ card, onSubmit, pending, onRemove }) => {
  const [prevCardId, setPrevCardId] = useState(null)
  const { user } = useSession()
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

  const handleFullscreenMobile = async event => {
    // await formik.submitForm()
    onSubmit({ isFullscreenMobile: event.target.checked })
  }

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
            {user.tier !== 'free' && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={card.isFullscreenMobile}
                      onChange={handleFullscreenMobile}
                    />
                  }
                  label="Make fullscreen on mobile"
                />
              </Grid>
            )}
            <Grid
              item
              xs={12}
              container
              justifyContent="flex-end"
              alignItems="flex-end"
            >
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
