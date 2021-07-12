import React, { useState, useEffect } from 'react'
import { TextField, Grid, Typography } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import CardImage from './CardImageUpload'

const CardFormMusic = ({ card, onSubmit, pending, onRemove }) => {
  const [prevCardId, setPrevCardId] = useState(null)

  const { title, text, links } = card || {}

  const getLink = type => {
    return ((links || []).find(link => link.type === type) || {}).url
  }

  const spotify = getLink('spotify')
  const youtube = getLink('youtube')
  const appleMusic = getLink('appleMusic')
  const other = getLink('other')

  const defaultValues = {
    title: title || '',
    text: text || '',
    youtube: youtube || '',
    spotify: spotify || '',
    appleMusic: appleMusic || '',
    other: other || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    youtube: Yup.string().url('Must be a valid URL'),
    spotify: Yup.string().url('Must be a valid URL'),
    appleMusic: Yup.string().url('Must be a valid URL'),
  })

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  const onFormSubmission = values => {
    const { title, text, ...musicLinks } = values
    const newValues = { title, text }

    const links = []
    const types = Object.keys(musicLinks)
    types.forEach(type => {
      const url = musicLinks[type]
      if (url) {
        const link = { type, url }
        links.push(link)
      }
    })

    newValues.links = links
    onSubmit(newValues)
  }

  //ensures the form is rerendered when the index is changed
  useEffect(() => {
    const setReset = () => {
      setPrevCardId(card.id)
      reset({ title, text, spotify, youtube, appleMusic, other })
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
            <CardImage card={card} onSubmit={onSubmit} crop />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <form id="card-form" onSubmit={handleSubmit(onFormSubmission)}>
          <Grid container justifyContent="flex-end" spacing={3}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="title"
                label="Title"
                placeholder="My Mixtape"
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
                label="Text"
                placeholder="Listen Now"
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
              <Typography variant="h5">Streaming Links</Typography>
              {/* <Typography>
                Add a button that links to external content. Leave the Link
                field blank to scroll to the next card instead.
              </Typography> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="youtube"
                label="Youtube"
                placeholder="https://youtu.be/"
                inputRef={register}
                error={Boolean(errors.youtube)}
                helperText={errors.youtube?.message}
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
                name="spotify"
                label="Spotify"
                placeholder="https://open.spotify.com/"
                inputRef={register}
                error={Boolean(errors.spotify)}
                helperText={errors.spotify?.message}
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
                name="appleMusic"
                label="Apple Music"
                placeholder="https://music.apple.com/"
                inputRef={register}
                error={Boolean(errors.appleMusic)}
                helperText={errors.appleMusic?.message}
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
                name="other"
                label="Other Site"
                placeholder="https://"
                inputRef={register}
                error={Boolean(errors.other)}
                helperText={errors.other?.message}
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

export default CardFormMusic
