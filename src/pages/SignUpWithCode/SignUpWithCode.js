import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Link,
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
import { useRequest } from 'hooks/use-request'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useUserStore from 'hooks/store/use-user-store'

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

const SignUpWithCode = ({ title, text }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [inviteState, setInviteState] = useState(null)
  const history = useHistory()

  const { acceptInvite } = useUserStore()
  const { setError, clearError } = useAlertStore()
  const { status, request } = useRequest()

  const code = new URLSearchParams(useLocation().search).get('code')
  const email = decodeURIComponent(
    new URLSearchParams(useLocation().search).get('email')
  )

  console.log(email)

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

    if (status === 'idle') {
      getState()
    }
  }, [code, email, request, setError, status])

  const handleSubmit = async ({ email, password }) => {
    setIsLoading(true)

    if (inviteState === 'NEW') {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)

        try {
          await acceptInvite(code)
        } catch (err) {
          setError({ message: err.message })
        }

        history.push(`/admin`)
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
    } else {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        history.push(`/admin`)
      } catch (err) {
        if (err.code === 'auth/wrong-password') {
          try {
            let signInMethods = await firebase
              .auth()
              .fetchSignInMethodsForEmail(email)

            console.log(signInMethods)
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
      {(status === 'loading' || status === 'idle') && <LoadingScreen />}
      {status === 'failed' && <SomethingWentWrong />}
      {status === 'succeeded' && inviteState === 'INVALID' && (
        <Container maxWidth="xs">
          <Box mt={20}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" color="white">
                  <b>Invite Code is Invalid</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6" color="white">
                  Please use another code or{' '}
                  <Link component={RouterLink} to={'/s/login'} color="inherit">
                    sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {status === 'succeeded' && inviteState === 'USED' && (
        <Container maxWidth="xs">
          <Box mt={20}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" color="white">
                  <b>Invite Accepted</b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6" color="white">
                  Please{' '}
                  <Link component={RouterLink} to={'/s/login'} color="inherit">
                    sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
      {status === 'succeeded' &&
        (inviteState === 'EXISTING' || inviteState === 'NEW') && (
          <Container maxWidth="xs">
            <Box mt={20}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent="flex-start" spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h4" color="white">
                      <b>
                        {inviteState === 'EXISTING' ? 'Sign In' : 'Sign Up'}
                      </b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb={1}>
                    <Typography variant="h6" color="white">
                      {inviteState === 'EXISTING' ? 'Sign In' : 'Sign Up'} to
                      accept your invite.
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
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
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
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
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
                      By signing up, you agree to our terms of service and
                      privacy policy.
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        )}
    </PublicNav>
  )
}

export default SignUpWithCode
