import React, { useState, useEffect } from 'react'
import {
  TextField,
  Grid,
  Typography,
  IconButton,
  Box,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import CardImage from './CardImageUpload'
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@material-ui/icons'
import useUserStore from 'hooks/store/use-user-store'

const CardFormHighlight = ({ card, onSubmit, pending, onRemove }) => {
  const { user } = useUserStore()
  const [prevCardId, setPrevCardId] = useState(null)

  const { title, text, label, url } = card || {}

  const defaultValues = {
    title: title || '',
    text: text || '',
    label: label || '',
    url: url || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    label: Yup.string().max(16, 'Must be 16 characters or less'),
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
      reset({ title, text, label, url })
    }
    if (card.id && prevCardId !== card.id) {
      setReset()
    }
  })

  const handleTextAlign = alignment => {
    onSubmit({ textAlign: alignment })
  }

  const handleHideButtons = async event => {
    onSubmit({ hideButtons: event.target.checked })
  }

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
                multiline
                rows={4}
                name="text"
                label="Text"
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
            {user.tier && user.tier !== 'free' && (
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
                label="Link"
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
            {user.tier && user.tier !== 'free' && (
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

export default CardFormHighlight
