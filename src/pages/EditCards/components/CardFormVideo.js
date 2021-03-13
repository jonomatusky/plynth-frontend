import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'

const CardFormText = ({ card, onSubmit, isLoading }) => {
  const defaultValues = {
    title: card.title || '',
    subtitle: card.text || '',
    url: card.
  }

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
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
            multiline
            rows={4}
            name="text"
            label="Message"
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
