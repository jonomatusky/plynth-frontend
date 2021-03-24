import React, { useState, useEffect } from 'react'
import { TextField, Grid, Box, Button as MuiButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'

const CardFormText = ({ card, onSubmit, isLoading, onRemove }) => {
  const [prevCardId, setPrevCardId] = useState(null)

  const defaultValues = {
    title: card.title || '',
    text: card.text || '',
    url: card.url || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    url: Yup.string().url(`Must be a valid URL. Include http:// or https://`),
  })

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  })

  //ensures the form is rerendered when the index is changed
  useEffect(() => {
    const setReset = () => {
      console.log('loading')
      setPrevCardId(card.id)
      reset({ title: card.title, text: card.text })
    }
    if (card.id && prevCardId !== card.id) {
      setReset()
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box minHeight="300px">
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
              placeholder="Get a sneak peak at our latest video..."
              inputRef={register}
              error={Boolean(errors.text)}
              helperText={errors.text?.message}
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
              label="Link to Video"
              placeholder="Add a link to your video"
              inputRef={register}
              error={Boolean(errors.url)}
              helperText={errors.url?.message}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container justifyContent="space-between" alignItems="flex-end">
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
              isLoading={isLoading}
              size="large"
            >
              Save Card
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}

export default CardFormText
