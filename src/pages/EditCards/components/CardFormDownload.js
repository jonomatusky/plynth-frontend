import React, { useEffect, useState } from 'react'
import {
  TextField,
  Grid,
  Box,
  FormControlLabel,
  Switch,
} from '@material-ui/core'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import useUserStore from 'hooks/store/use-user-store'

const CardFormText = ({ card, onSubmit, pending, onRemove }) => {
  const { user } = useUserStore()
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
      setPrevCardId(card.id)
      reset({ title: card.title, text: card.text, url: card.url })
    }
    if (card.id && prevCardId !== card.id) {
      setReset()
    }
  })

  const handleEmailDownload = async event => {
    onSubmit({ emailDownload: event.target.checked })
  }

  return (
    <form id="card-form" onSubmit={handleSubmit(onSubmit)}>
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
              label="Direct Download Link"
              placeholder="Add a link to your download"
              inputRef={register}
              error={Boolean(errors.url)}
              helperText={errors.url?.message}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {user.tier && user.tier !== 'free' && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={card.emailDownload}
                    onChange={handleEmailDownload}
                  />
                }
                label="Let users send the file to their email"
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
      </Box>
    </form>
  )
}

export default CardFormText
