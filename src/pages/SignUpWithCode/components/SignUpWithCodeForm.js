import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Link,
  TextField,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'images/btn_google_light_normal_ios.svg'
import { useRequest } from 'hooks/use-request'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import Loading from 'components/Loading'
import usePackStore from 'hooks/store/use-pack-store'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  displayName: yup
    .string('Enter your first name')
    .required('First name is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const SignUpWithCodeForm = () => {
  const [inviteState, setInviteState] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)
  const [code, setCode] = useState(
    new URLSearchParams(useLocation().search).get('code')
  )
  const history = useHistory()

  const { user, logout } = useSession()
  const { acceptInvite } = useUserStore()
  const { fetchPacks } = usePackStore()
  const { setError, clearError } = useAlertStore()
  const { status, request } = useRequest()

  const email = decodeURIComponent(
    new URLSearchParams(useLocation().search).get('email') || ''
  )

  useEffect(() => {
    const getState = async () => {
      try {
        const { state } = await request({
          method: 'POST',
          url: '/auth/invite',
          data: {
            email: email,
            code: code,
          },
        })
        setInviteState(state)
      } catch (err) {
        setError({ message: err.message })
      }
    }

    if (status === 'idle' && !!code) {
      getState()
    }
  }, [code, email, request, setError, status])

  const signIn = async (email, password) => {
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

  const signUp = async (email, password) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (err) {
      if (err.code === 'auth/invalid-email') {
        setError({ message: 'Please enter a valid email address' })
      } else if (err.code === 'auth/email-already-in-use') {
        try {
          await signIn(email, password)
        } catch (err) {}
      } else {
        setError({
          message:
            'There was an error creating your account. Please try again.',
        })
      }
    }
  }

  const handleSubmit = async ({ email, password, displayName }) => {
    if (status === 'loading') {
      return
    }

    if (inviteState === 'NEW' || !code) {
      try {
        await signUp(email, password, displayName)
        setLoggedIn(true)
      } catch (err) {
        setError({ message: err.message })
      }
    } else {
      try {
        await signIn(email, password)
        setLoggedIn(true)
      } catch (err) {
        setError({ message: err.message })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      displayName: '',
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
      setLoggedIn(true)
    } catch (err) {
      setError({ message: 'Unable to sign in' })
    }
  }

  useEffect(() => {
    const handleLoggedIn = async () => {
      if (!loggedIn) {
        logout()
      } else {
        await acceptInvite(code)
        try {
          await fetchPacks()
        } catch (err) {}
        history.push(`/admin/pieces/new`)
      }
    }

    if (user) {
      handleLoggedIn()
    }
  }, [acceptInvite, code, history, loggedIn, logout, user, fetchPacks])

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'failed' && <SomethingWentWrong />}
      {status === 'succeeded' && inviteState === 'INVALID' && (
        <Container maxWidth="xs">
          <Box mt={10}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" color="white" textAlign="center">
                  <b>Invite Code is Invalid</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6" color="white" textAlign="center">
                  Please enter the correct code or{' '}
                  <Link component={RouterLink} to={'/login'} color="inherit">
                    sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {status === 'succeeded' && inviteState === 'USED' && (
        <Grid container justifyContent="flex-start" spacing={3}>
          <Grid item xs={12} mb={2}>
            <Typography variant="h4" color="white">
              <b>Invite Accepted</b>
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h6" color="white">
              Please{' '}
              <Link component={RouterLink} to={'/login'} color="inherit">
                sign in
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}
      {((status === 'succeeded' &&
        (inviteState === 'EXISTING' || inviteState === 'NEW')) ||
        !code) && (
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={3}>
            <Grid item xs={12}>
              <Typography>Sign up for a free account.</Typography>
            </Grid>
            {!code && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Code"
                  value={code}
                  onChange={value => setCode(value)}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                label="First Name"
                {...formik.getFieldProps('displayName')}
                error={
                  formik.touched.displayName &&
                  Boolean(formik.errors.displayName)
                }
                helperText={
                  formik.touched.displayName && formik.errors.displayName
                }
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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
            {!!code && (
              <>
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
              </>
            )}
          </Grid>
        </form>
      )}
    </>
  )
}

export default SignUpWithCodeForm
