import React from 'react'
import {
  Link,
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'images/btn_google_light_normal_ios.svg'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
})

const NewPortalSignUp = ({ title, text }) => {
  const history = useHistory()

  const { setError, clearError } = useAlertStore()

  const handleSubmit = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      history.push(`/admin`)
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        try {
          let signInMethods = await firebase
            .auth()
            .fetchSignInMethodsForEmail(email)

          if (
            signInMethods.length !== 0 &&
            !signInMethods.includes('password')
          ) {
            setError({
              message:
                'No password found for this account. Try a different login method.',
            })
          } else {
            setError({
              message: `Incorrect email or password. Please try again.`,
            })
          }
        } catch (err) {
          setError({
            message: `Incorrect email or password. Please try again.`,
          })
        }
      } else if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/user-not-found') {
        setError({
          message: `Incorrect email or password. Please try again.`,
        })
      } else {
        setError({
          message: `Incorrect email or password. Please try again.`,
        })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  var provider = new firebase.auth.GoogleAuthProvider()

  const handleSignInWithGoogle = async () => {
    clearError()
    try {
      await firebase.auth().signInWithPopup(provider)
      history.push('/admin')
    } catch (err) {
      setError({ message: 'Unable to sign in' })
    }
  }

  return (
    <PublicNav right={<></>} hideFooter>
      <Container maxWidth="xs">
        <Box mt={10}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4">
                  <b>{title || 'Sign In'}</b>
                </Typography>
              </Grid>
              {text && (
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6">
                    <b>{text}</b>
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
                <Typography mt={1}>
                  <Link
                    component={RouterLink}
                    to="/recover"
                    color="secondary"
                    underline="hover"
                  >
                    Forgot password?
                  </Link>
                </Typography>
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
                    Sign In
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
                  onClick={handleSignInWithGoogle}
                >
                  <Box display="flex" mr="24px">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </Box>
                  <Typography letterSpacing={1} style={{ fontWeight: 500 }}>
                    Sign in with Google
                  </Typography>
                </Button>
              </Grid>
              <Grid item container justifyContent="center">
                <Typography variant="body2" color="white">
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    color="white"
                    to={'/signup'}
                    size="small"
                  >
                    <b>Sign Up</b>
                  </Link>
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
