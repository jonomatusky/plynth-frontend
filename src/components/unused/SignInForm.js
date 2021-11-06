import React from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
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

const SignInForm = () => {
  const { setError, clearError } = useAlertStore()

  const handleSubmit = async ({ email, password }) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
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
    } catch (err) {
      setError({ message: 'Unable to sign in' })
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Typography>
            Create an account to publish your experience and download the
            printable files. It's free!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            label="Password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <Button type="submit" variant="contained" size="large" fullWidth>
            <Typography
              letterSpacing={1}
              style={{ fontWeight: 900, textTransform: 'none' }}
            >
              Create Account
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
            color="secondary"
            fullWidth
            sx={{
              textTransform: 'none',
              backgroundColor: '#ffffff',
              '&:hover': {
                backgroundColor: '#ffffff',
              },
            }}
            onClick={handleSignInWithGoogle}
          >
            <Box display="flex" mr="14px">
              <img src={GoogleLogo} alt="Google Logo" height="32px" />
            </Box>
            <Typography letterSpacing={1} style={{ fontWeight: 500 }}>
              Sign in with Google
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignInForm
