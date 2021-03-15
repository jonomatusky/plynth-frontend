import React, { useEffect } from 'react'
import { TextField, Grid, Box, Button as MuiButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'

const CardFormText = ({ card, onSubmit, isLoading, onRemove }) => {
  const defaultValues = {
    title: card.title || '',
    text: card.text || '',
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

  useEffect(() => {
    reset({ title: card.title, text: card.text })
  }, [card, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box minHeight="300px">
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
        </Grid>
      </Box>
      <Box>
        <Grid container justify="space-between" alignItems="flex-end">
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
