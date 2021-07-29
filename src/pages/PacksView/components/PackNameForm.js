import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Grid,
  TextField,
  Button as MuiButton,
  Typography,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Button from 'components/Button'
import { ArrowForward, Close } from '@material-ui/icons'

const PackNameForm = ({ onSubmit, onCancel, name, buttonText, pending }) => {
  const defaultValues = {
    name: name,
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Keep it under 50 characters')
      .required('Add a name'),
  })

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues,
    validateOnBlur: false,
    validateOnChange: false,
    shouldUnregister: false,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="name"
            label="Name"
            placeholder="Awesome Pack"
            inputRef={register}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            autoComplete="off"
            // InputProps={{
            //   fontSize: 50,
            // }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            (You can always change this later)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="space-between" alignItems="center">
            {onCancel && (
              <Grid item>
                <Grid item>
                  <MuiButton
                    onClick={onCancel}
                    variant="text"
                    startIcon={<Close />}
                    size="small"
                    type="button"
                  >
                    Cancel
                  </MuiButton>
                </Grid>
              </Grid>
            )}

            <Grid item>
              <Button
                fullWidth
                type="submit"
                variant="text"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                pending={pending}
              >
                <b>{buttonText || 'Submit'}</b>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default PackNameForm
