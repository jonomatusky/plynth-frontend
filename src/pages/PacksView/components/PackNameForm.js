import React from 'react'
import { Grid, TextField, Button as MuiButton } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from 'components/Button'
import { ArrowForward, Close } from '@mui/icons-material'

const PackNameForm = ({ onSubmit, onCancel, name, buttonText, pending }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, 'Keep it under 50 characters')
      .required('Add a name'),
  })

  const formik = useFormik({
    initialValues: {
      name: name || '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="name"
            label="Name"
            placeholder="Awesome Pack"
            {...formik.getFieldProps('name')}
            error={formik.touched.youtube && Boolean(formik.errors.youtube)}
            helperText={formik.touched.youtube && formik.errors.youtube}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
          />
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
                    onBlur={formik.handleSubmit}
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
                variant="contained"
                color="primary"
                size="large"
                endIcon={<ArrowForward />}
                loading={pending}
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
