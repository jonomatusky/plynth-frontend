import React from 'react'
import {
  TextField,
  Grid,
  Box,
  Switch,
  FormControlLabel,
  Typography,
  IconButton,
} from '@material-ui/core'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUserStore from 'hooks/store/use-user-store'
import CardImage from './CardImageUpload'
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@material-ui/icons'
import ButtonsCard from './ButtonsCard'

const CardForm = ({ card, onSubmit, pending, onRemove }) => {
  const { user } = useUserStore()

  const { links } = card || {}

  const show = {
    buttons: { title: true, text: true, links: true },
    download: { title: true, text: true, url: true },
    highlight: {
      image: true,
      title: true,
      text: 'Subtitle',
      label: true,
      url: true,
      textAlign: true,
      hideButtons: true,
    },
    image: { image: true, title: true, text: 'Subtitle' },
    music: { image: true, title: true, text: 'Subtitle', musicButtons: true },
    text: { title: true, text: true, multiline: true },
    video: {
      title: true,
      text: 'Subtitle',
      url: 'Link to video',
      isFullscreenMobile: true,
      loopingVideo: true,
    },
  }

  const showField = show[card.type]

  const getLink = type => {
    return ((links || []).find(link => link.type === type) || {}).url
  }

  const spotify = getLink('spotify')
  const youtube = getLink('youtube')
  const appleMusic = getLink('appleMusic')
  const other = getLink('other')

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    label: Yup.string().max(32, 'Must be 32 characters or less'),
    url: Yup.string().url(`Must be a valid URL. Include http:// or https://`),
    youtube: Yup.string().url('Must be a valid URL'),
    spotify: Yup.string().url('Must be a valid URL'),
    appleMusic: Yup.string().url('Must be a valid URL'),
    other: Yup.string().url('Must be a valid URL'),
  })

  const handleSubmit = values => {
    const { spotify, appleMusic, youtube, other, ...rest } = values
    const musicLinks = { spotify, appleMusic, youtube, other }

    if (spotify || appleMusic || youtube || other) {
      const links = []
      const types = Object.keys(musicLinks)
      types.forEach(type => {
        const url = musicLinks[type]
        if (url) {
          const link = { type, url }
          links.push(link)
        }
      })

      rest.links = links
    }

    onSubmit(rest)
  }

  const formik = useFormik({
    initialValues: {
      title: card.title || '',
      text: card.text || '',
      label: card.label || '',
      url: card.url || '',
      spotify: spotify || '',
      youtube: youtube || '',
      appleMusic: appleMusic || '',
      other: other || '',
      isFullscreenMobile: !!card.isFullscreenMobile,
      loopingVideo: !!card.loopingVideo,
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  })

  const handleFullscreenMobile = async event => {
    formik.setFieldValue('isFullscreenMobile', event.target.checked)
    formik.submitForm()
  }

  const handleLoopingVideo = async event => {
    formik.setFieldValue('loopingVideo', event.target.checked)
    formik.submitForm()
  }

  const handleTextAlign = alignment => {
    onSubmit({ textAlign: alignment })
  }

  const handleHideButtons = async event => {
    onSubmit({ hideButtons: event.target.checked })
  }

  return (
    <Box minHeight="300px" pb={2}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="flex-end" spacing={3}>
          {showField.image && (
            <Grid item container xs={12} justifyContent="center">
              <Grid item>
                <CardImage card={card} onSubmit={onSubmit} crop />
              </Grid>
            </Grid>
          )}
          {showField.title && (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="title"
                label={showField.title === true ? 'Text' : showField.title}
                placeholder="Thanks for the support!"
                {...formik.getFieldProps('title')}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={formik.handleSubmit}
              />
            </Grid>
          )}
          {showField.text && (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="text"
                label={showField.text === true ? 'Text' : showField.text}
                placeholder="Get a sneak peak at our latest video..."
                {...formik.getFieldProps('text')}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={formik.handleSubmit}
                multiline={!!showField.multiline}
                rows={showField.multiline ? 4 : null}
              />
            </Grid>
          )}
          {user.tier && user.tier !== 'free' && showField.textAlign && (
            <Grid item xs={12} container alignItems="center">
              <Grid item>
                <Box pr={1}>
                  <Typography>Text Align</Typography>
                </Box>
              </Grid>
              <Grid item>
                <IconButton
                  color={
                    !card.textAlign || card.textAlign === 'left'
                      ? 'primary'
                      : 'default'
                  }
                  onClick={() => handleTextAlign('left')}
                >
                  <FormatAlignLeft />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color={card.textAlign === 'center' ? 'primary' : 'default'}
                  onClick={() => handleTextAlign('center')}
                >
                  <FormatAlignCenter />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color={card.textAlign === 'right' ? 'primary' : 'default'}
                  onClick={() => handleTextAlign('right')}
                >
                  <FormatAlignRight />
                </IconButton>
              </Grid>
            </Grid>
          )}
          {showField.label && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5">Add a Button</Typography>
                <Typography>
                  Add a button that links to external content. Leave the Link
                  field blank to scroll to the next card instead.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="label"
                  label={
                    showField.label === true ? 'Button Label' : showField.label
                  }
                  placeholder="Add a button label"
                  {...formik.getFieldProps('label')}
                  error={formik.touched.label && Boolean(formik.errors.label)}
                  helperText={formik.touched.label && formik.errors.label}
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}
          {showField.url && (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="url"
                label={showField.url === true ? 'Text' : showField.url}
                placeholder="Add a link to your video"
                {...formik.getFieldProps('url')}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={formik.handleSubmit}
              />
            </Grid>
          )}
          {showField.musicButtons && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5">Streaming Links</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="youtube"
                  label="Youtube"
                  placeholder="https://youtu.be/"
                  {...formik.getFieldProps('youtube')}
                  error={
                    formik.touched.youtube && Boolean(formik.errors.youtube)
                  }
                  helperText={formik.touched.youtube && formik.errors.youtube}
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
                  {...formik.getFieldProps('spotify')}
                  error={
                    formik.touched.spotify && Boolean(formik.errors.spotify)
                  }
                  helperText={formik.touched.spotify && formik.errors.spotify}
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
                  {...formik.getFieldProps('appleMusic')}
                  error={
                    formik.touched.appleMusic &&
                    Boolean(formik.errors.appleMusic)
                  }
                  helperText={
                    formik.touched.appleMusic && formik.errors.appleMusic
                  }
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
                  {...formik.getFieldProps('other')}
                  error={formik.touched.other && Boolean(formik.errors.other)}
                  helperText={formik.touched.other && formik.errors.other}
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}
          {showField.hideButtons && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={card.hideButtons}
                    onChange={handleHideButtons}
                  />
                }
                label="Hide navigation arrows"
              />
            </Grid>
          )}
          {showField.isFullscreenMobile ||
            (showField.loopingVideo && (
              <Grid item xs={12} container>
                {showField.isFullscreenMobile && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={!!card.isFullscreenMobile}
                          onChange={handleFullscreenMobile}
                        />
                      }
                      label="Make fullscreen on mobile (Vimeo-only)"
                    />
                  </Grid>
                )}
                {showField.loopingVideo && user.tier !== 'free' && (
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={!!card.loopingVideo}
                          onChange={handleLoopingVideo}
                        />
                      }
                      label="Looping video"
                      disabled={!card.isFullscreenMobile}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
        </Grid>
      </form>
      {showField.links && <ButtonsCard card={card} onSubmit={onSubmit} />}
      <Box height="20px" />
    </Box>
  )
}

export default CardForm
