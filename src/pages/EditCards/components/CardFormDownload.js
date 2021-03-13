import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'

const CardFormText = ({ card, onSubmit, isLoading }) => {
  const defaultValues = {
    title: card.title || '',
    text: card.text || '',
    url: card.embed || '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    url: Yup.string().url(`Must be a valid URL. Include http:// or https://`),
  })

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    shouldUnregister: false,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="flex-end" spacing={3}>
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
            error={Boolean(errors.embed)}
            helperText={errors.embed?.message}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              isLoading={isLoading}
              size="large"
            >
              {`Update`}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default CardFormText
