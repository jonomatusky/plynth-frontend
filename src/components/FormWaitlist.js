import React from 'react'
import { Grid, Typography, Button, Box } from '@mui/material'
import * as yup from 'yup'
import ReactGA from 'react-ga'

import TextFieldWebsite from 'components/TextFieldWebsite'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import useUserStore from 'hooks/store/use-user-store'
import { ArrowForward } from '@mui/icons-material'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const FormWaitlist = ({ title, text }) => {
  const { subscribe, subscribeStatus } = useUserStore()
  const { setError } = useAlertStore()

  const handleSubmit = async values => {
    if (subscribeStatus !== 'loading') {
      try {
        subscribe({ email: values.email, tags: ['waitlist'] })
      } catch (err) {
        setError({
          message: 'There was an error submitting the form. Please try again.',
        })
      }

      try {
        ReactGA.event({
          category: 'User',
          action: 'Waitlist Form Submission',
        })
      } catch (err) {
        console.log('error with GA')
      }
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
    <>
      {subscribeStatus === 'succeeded' && (
        <Box height="151px">
          <Grid container justifyContent="flex-start" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" color="white" textAlign="center">
                You're on the list!
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
      {subscribeStatus !== 'succeeded' && (
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={3}>
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
                endIcon={<ArrowForward />}
              >
                <Typography letterSpacing={1} style={{ fontWeight: 600 }}>
                  Join the Waitlist
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  )
}

export default FormWaitlist
