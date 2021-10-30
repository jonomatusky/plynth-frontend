import React, { useState } from 'react'
import { TextField, Grid, Box, Button, Paper } from '@mui/material'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSession } from 'hooks/use-session'
import useAlertStore from 'hooks/store/use-alert-store'
import DialogVerifyPassword from './DialogVerifyPassword'

const FormEmail = () => {
  const { user } = useSession()
  const { setError, setMessage } = useAlertStore()
  const [verifyPasswordDialogIsOpen, setVerifyPasswordDialogIsOpen] =
    useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email('Please enter a valid email address.'),
  })

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await user.updateEmail(values.email)
      setMessage({ message: 'Email successfully updated' })
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/email-already-in-use') {
        setError({ message: `Another account is using ${values.email}` })
        resetForm()
      } else if (err.code === 'auth/requires-recent-login') {
        setVerifyPasswordDialogIsOpen(true)
      } else {
        setError({ message: 'An error occurred. Please try again.' })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: user.email || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  const handleError = () => {
    formik.handleReset()
  }

  return (
    <>
      <DialogVerifyPassword
        open={verifyPasswordDialogIsOpen}
        email={formik.values.email}
        onError={handleError}
        user={user}
        onClose={() => setVerifyPasswordDialogIsOpen(false)}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Box p={3}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Box flexGrow={1}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          name="email"
                          label="Email"
                          placeholder="Email"
                          {...formik.getFieldProps('email')}
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          autoComplete="off"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          type="email"
                          size="small"
                          sx={{ height: '38px' }}
                        />
                      </Box>
                      <Box pl={2}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="medium"
                          sx={{ height: '38px' }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default FormEmail
