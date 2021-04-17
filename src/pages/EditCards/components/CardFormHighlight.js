import React, { useState, useEffect } from 'react'
import { TextField, Grid, Button as MuiButton, Box } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import CardImage from './CardImage'

const CardFormHighlight = ({ card, onSubmit, isLoading, onRemove }) => {
  const [prevCardId, setPrevCardId] = useState(null)

  const { title, text, links } = card || {}

  const defaultValues = {
    title: title || '',
    text: text || '',
    label: ((links || [])[0] || {}).name || '',
    url: ((links || [])[0] || {}).url || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    label: Yup.string()
      .max(16, 'Must be 16 characters or less')
      .required('Required'),
    url: Yup.string().url('Must be a valid URL'),
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
      reset({ title: card.title, text: card.text })
    }
    if (card.id && prevCardId !== card.id) {
      setReset()
    }
  })

  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center">
        <Grid item container xs={12} justifyContent="center">
          <Grid item>
            <CardImage card={card} onSubmit={onSubmit} />
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
            <Grid item xs={12} />
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="label"
                label="Button Label"
                placeholder="Add a button label"
                inputRef={register}
                error={Boolean(errors.label)}
                helperText={errors.label?.message}
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
                name="url"
                label="Button Link"
                placeholder="Leave this blank to take users to the next card"
                inputRef={register}
                error={Boolean(errors.url)}
                helperText={errors.url?.message}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
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
                  pending={isLoading}
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

export default CardFormHighlight
