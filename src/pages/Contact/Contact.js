import React from 'react'
import { Link, Container, Box, Grid, Typography } from '@mui/material'
import * as yup from 'yup'

import { Link as RouterLink } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { useRequest } from 'hooks/use-request'
import { LoadingButton } from '@mui/lab'

const validationSchema = yup.object({
  name: yup.string('Enter your name').required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  content: yup
    .string('Enter your password')
    .max(500, 'Message can not be more than 500 characters')
    .required('Message is required'),
})

const Contact = ({ title, text }) => {
  const { setError } = useAlertStore()
  const { status, request } = useRequest()

  const handleSubmit = async values => {
    try {
      const data = { message: { ...values, type: 'contact' } }

      await request({
        url: `/messages`,
        method: 'POST',
        data,
      })
    } catch (err) {
      setError({
        message: 'Sorry, we were unable to submit the form. Please try again.',
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      content: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  return (
    <PublicNav>
      <Container maxWidth="xs">
        <Box pt={8}>
          <Grid container>
            {status === 'succeeded' && (
              <Grid item xs={12}>
                <Typography variant="h5" mb={2}>
                  <b>Thanks for contacting us</b>
                </Typography>

                <Typography>
                  We'll get back to you as quickly as possible.
                </Typography>
              </Grid>
            )}
            {status !== 'succeeded' && (
              <Grid item xs={12}>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container justifyContent="flex-start" spacing={3}>
                    <Grid item xs={12} mb={1}>
                      <Typography variant="h4">
                        <b>Contact Us</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        Got a question? We're here to help. Fill out this form
                        and we'll get back to you as soon as possible.
                      </Typography>
                    </Grid>
                    <Grid item xs={12} mb={1}>
                      <Typography variant="body2">
                        Need immediate support?{' '}
                        <Link
                          component={RouterLink}
                          to="/s/help"
                          color="inherit"
                          underline="always"
                        >
                          Let us know
                        </Link>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextFieldWebsite
                        variant="outlined"
                        fullWidth
                        size="small"
                        placeholder="name"
                        {...formik.getFieldProps('name')}
                        FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                        error={
                          formik.touched.name && Boolean(formik.errors.name)
                        }
                        helperText={formik.touched.name && formik.errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWebsite
                        variant="outlined"
                        fullWidth
                        size="small"
                        placeholder="email"
                        {...formik.getFieldProps('email')}
                        FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextFieldWebsite
                        type="content"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                        placeholder="content"
                        {...formik.getFieldProps('content')}
                        FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                        error={
                          formik.touched.content &&
                          Boolean(formik.errors.content)
                        }
                        helperText={
                          formik.touched.content && formik.errors.content
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ height: '51.5px' }}
                        loading={status === 'loading'}
                      >
                        <Typography
                          letterSpacing={1}
                          style={{ fontWeight: 900, fontSize: '18px' }}
                        >
                          Submit
                        </Typography>
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Contact
