import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
} from '@material-ui/core'
import * as yup from 'yup'
import LoadingButton from '@material-ui/lab/LoadingButton'

import firebase from 'config/firebase'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import WebsiteNavBar from 'components/WebsiteNavBar'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { ArrowForward } from '@material-ui/icons'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'images/btn_google_light_normal_ios.svg'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const NewPortalSignUp = ({ title, text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const { setError, clearError } = useAlertStore()

  const username = new URLSearchParams(useLocation().search).get('username')
  const code = new URLSearchParams(useLocation().search).get('code')
  const email = new URLSearchParams(useLocation().search).get('email')

  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true)
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      history.push(
        `/s/new-portal/username` + (username ? `?username=${username}` : '')
      )
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/email-already-in-use') {
        setError({
          message: `Another account is using ${email}. Please sign in instead.`,
        })
      } else {
        setError({
          message:
            'There was an error creating your account. Please try again.',
        })
      }
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      email: email || '',
      password: '',
      code: code || null,
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  var provider = new firebase.auth.GoogleAuthProvider()

  const handleSignUpWithGoogle = async () => {
    clearError()
    try {
      await firebase.auth().signInWithPopup(provider)
      history.push('/admin')
    } catch (err) {
      setError({ message: 'Unable to sign in' })
    }
  }

  return (
    <PublicNav>
      <WebsiteNavBar
        right={
          <>
            <Typography variant="body2" color="white">
              Already have an account?{' '}
            </Typography>
            <Button
              component={RouterLink}
              to={'/admin/login'}
              size="small"
              sx={{ textTransform: 'lowercase' }}
            >
              <Typography color="#BBBBBB">
                <b>_sign in</b>
              </Typography>
            </Button>
          </>
        }
      />
      <Container maxWidth="xs">
        <Box mt={20}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" color="white">
                  <b>{title || 'Sign Up'}</b>
                </Typography>
              </Grid>
              {text && (
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6" color="white">
                    {text}
                  </Typography>
                </Grid>
              )}
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
                <TextFieldWebsite
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="password"
                  {...formik.getFieldProps('password')}
                  FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                  fullWidth
                  sx={{ height: '51.5px' }}
                  pending={isLoading}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    Continue
                  </Typography>
                </LoadingButton>
              </Grid>
              <Grid item xs={12} container alignItems="center" spacing={1}>
                <Grid item xs>
                  <Divider color="#999999" />
                </Grid>
                <Grid item>
                  <Typography color="#999999" variant="body2">
                    or
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Divider color="#999999" />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  color="secondary"
                  fullWidth
                  sx={{
                    height: '51.5px',
                    textTransform: 'none',
                    backgroundColor: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                  onClick={handleSignUpWithGoogle}
                >
                  <Box display="flex" mr="24px">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </Box>
                  <Typography letterSpacing={1} style={{ fontWeight: 500 }}>
                    Sign up with Google
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="#ffffffcc">
                  By signing up, you agree to our terms of service and privacy
                  policy.
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default NewPortalSignUp
