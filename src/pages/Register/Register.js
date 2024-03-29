import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { ArrowForward } from '@mui/icons-material'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'images/btn_google_light_normal_ios.svg'
import { useSession } from 'hooks/use-session'
import { useUserStore } from 'hooks/store/use-user-store'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const Register = ({ title, text }) => {
  const history = useHistory()
  const { user, logout } = useSession()
  const { subscribe } = useUserStore()
  const { setError, clearError } = useAlertStore()
  const [status, setStatus] = useState('idle')

  const username = new URLSearchParams(useLocation().search).get('username')
  const email = new URLSearchParams(useLocation().search).get('email')

  const handleSubmit = async ({ email, password }) => {
    setStatus('loading')
    try {
      await logout()
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      setStatus('succeeded')
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
  }

  const formik = useFormik({
    initialValues: {
      email: email || '',
      password: '',
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
      setStatus('succeeded')
    } catch (err) {
      setError({ message: 'Unable to sign in' })
    }
  }

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (status === 'succeeded') {
        if (user.email) {
          subscribe({ email: user.email, tags: ['waitlist'] })
        }

        history.push(
          `/register/username` + (username ? `?username=${username}` : '')
        )
      }
    }

    if (user) {
      handleLoggedIn()
    }
  }, [subscribe, history, logout, user, username, status])

  return (
    <PublicNav
      right={
        <>
          <Typography
            variant="body2"
            color="white"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Already have an account?{' '}
          </Typography>
          <Button
            color="secondary"
            component={RouterLink}
            to={'/login'}
            size="small"
            sx={{ textTransform: 'lowercase' }}
          >
            <Typography color="#BBBBBB">
              <b>Sign In</b>
            </Typography>
          </Button>
        </>
      }
      hideFooter
    >
      <Container maxWidth="xs">
        <Box mt={10}>
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
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  size="large"
                  fullWidth
                  sx={{ height: '51.5px' }}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    Continue
                  </Typography>
                </Button>
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

export default Register
