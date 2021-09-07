import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import * as yup from 'yup'

import firebase from 'config/firebase'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { ArrowForward } from '@material-ui/icons'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { useUserStore } from 'hooks/store/use-user-store'
import ButtonWebsite from 'components/ButtonWebsite'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const EmailForm = ({ onSubmit }) => {
  const { setError } = useAlertStore()
  const { subscribe } = useUserStore()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (loading === true) {
      setTimeout(() => setLoading(false), 1000)
    }
  }, [loading])

  const handleSubmit = async ({ email }) => {
    setLoading(true)
    try {
      const result = await firebase.auth().fetchSignInMethodsForEmail(email)
      if ((result || []).length === 0) {
        subscribe(email)
        onSubmit(email)
      } else {
        setError({
          message:
            'Looks like you already have an account! Please log in instead.',
        })
      }
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else {
        setError({
          message: 'There was an error. Please try again.',
        })
      }
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={3}>
        <Grid item xs={12} mt={2}>
          <Typography variant="h4" color="white">
            <b>Try It Now</b>
          </Typography>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Typography variant="h6" color="white">
            <b>First, what's your email address?</b>
          </Typography>
        </Grid>
        {/* <Grid item xs={12} mb={2}>
          <Typography variant="h6" color="white"></Typography>
        </Grid> */}
        <Grid item xs={12} mb={1}>
          <TextFieldWebsite
            autoFocus
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
          <ButtonWebsite endIcon={<ArrowForward />} loading={loading}>
            Next: link an image
          </ButtonWebsite>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="#ffffffcc">
            By entering your email, you agree to our terms of service and
            privacy policy.
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}

export default EmailForm
