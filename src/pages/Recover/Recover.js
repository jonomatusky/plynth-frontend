import React, { useState } from 'react'
import { Container, Box, Grid, Typography, Button } from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { Close } from '@mui/icons-material'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const Recover = ({ title, text }) => {
  const [isSent, setIsSent] = useState(false)

  const { setError } = useAlertStore()

  const handleSubmit = async ({ email }) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email)
      setIsSent(true)
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code !== 'auth/user-not-found') {
        setError({
          message: 'Unable to send password reset email. Please try again.',
        })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <PublicNav
      right={
        <Button
          type="button"
          component={RouterLink}
          to="/login"
          size="small"
          sx={{ textTransform: 'lowercase' }}
          endIcon={<Close color="secondary" />}
        >
          <Typography color="#BBBBBB">{isSent ? 'close' : 'cancel'}</Typography>
        </Button>
      }
      hideFooter
    >
      <Container maxWidth="xs">
        <Box mt={10}>
          {isSent && (
            <Grid container justifyContent="flex-start" spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h4" color="white">
                  <b>Check your email</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="white">
                  If an account exists, we've sent a reset link to the email
                  address provided.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="button"
                  component={RouterLink}
                  to="/login"
                  endIcon={<Close color="secondary" />}
                >
                  <Typography color="white">Close</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
          {!isSent && (
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent="flex-start" spacing={3}>
                <Grid item xs={12} mb={2}>
                  <Typography variant="h4" color="white">
                    <b>Password recovery</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6" color="white">
                    Enter the email you're using for your account.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWebsite
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="email"
                    {...formik.getFieldProps('email')}
                    FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ height: '51.5px' }}
                  >
                    <Typography
                      letterSpacing={1}
                      style={{ fontWeight: 900, fontSize: '18px' }}
                    >
                      Continue
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="button"
                    component={RouterLink}
                    to="/login"
                    fullWidth
                  >
                    <Typography color="white">Cancel</Typography>
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Recover
