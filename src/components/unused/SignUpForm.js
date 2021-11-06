import React, { useEffect, useState } from 'react'
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
import { useSession } from 'hooks/use-session'
import { useUserStore } from 'hooks/store/use-user-store'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string('Enter your password').required('Password is required'),
  displayName: yup
    .string('Enter your first name')
    .required('First name is required'),
})

const SignUpForm = () => {
  const { setError, clearError } = useAlertStore()
  const { user } = useSession()
  const { subscribe } = useUserStore()

  const [status, setStatus] = useState('idle')

  const handleSubmit = async ({ email, password }) => {
    setStatus('loading')
    try {
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

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (user.email) {
        subscribe({ email: user.email, tags: ['waitlist'] })
      }
    }

    if (user) {
      handleLoggedIn()
    }
  }, [subscribe, user])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      displayName: '',
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
            label="First Name"
            {...formik.getFieldProps('displayName')}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
          />
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

export default SignUpForm
