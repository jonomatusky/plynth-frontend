import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  Link,
  Hidden,
} from '@material-ui/core'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import PublicNav from 'layouts/PublicNav'
import TextFieldWebsite from 'components/TextFieldWebsite'
import { ArrowForward } from '@material-ui/icons'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import GoogleLogo from 'images/btn_google_light_normal_ios.svg'
import { useRequest } from 'hooks/use-request'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  // code: yup
  //   .string('Enter your invite code')
  //   .required('Invite code is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const SignUpWithCode = () => {
  const [inviteState, setInviteState] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)
  const [code, setCode] = useState(
    new URLSearchParams(useLocation().search).get('code')
  )
  const history = useHistory()

  const { user, logout } = useSession()
  const { acceptInvite } = useUserStore()
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

  const handleSubmit = async ({ email, password }) => {
    if (status === 'loading') {
      return
    }

    if (inviteState === 'NEW' || !code) {
      try {
        await signUp(email, password)

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
      // if (!loggedIn) {
      //   logout()
      // } else

      if (loggedIn) {
        await acceptInvite(code)
        history.push(`/admin`)
      }
    }

    if (user) {
      handleLoggedIn()
    }
  }, [acceptInvite, code, history, loggedIn, logout, user])

  return (
    <PublicNav
      hideFooter
      right={
        <>
          <Hidden smDown>
            <Typography variant="body2" color="white">
              Already have an account?{' '}
            </Typography>
          </Hidden>
          <Button
            color="secondary"
            component={RouterLink}
            to={'/login'}
            size="small"
            sx={{ textTransform: 'lowercase' }}
          >
            <Typography color="#BBBBBB">
              <b>_sign in</b>
            </Typography>
          </Button>
        </>
      }
    >
      {status === 'loading' && <LoadingScreen />}
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
        <Container maxWidth="xs">
          <Box mt={10}>
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
          </Box>
        </Container>
      )}
      {((status === 'succeeded' &&
        (inviteState === 'EXISTING' || inviteState === 'NEW')) ||
        !code) && (
        <Container maxWidth="xs">
          <Box mt={8}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container justifyContent="flex-start" spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" color="white">
                    <b>Accept Invite</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Typography variant="h6" color="white">
                    {inviteState === 'EXISTING' ? 'Sign in' : 'Sign up'} to
                    accept your invite.
                  </Typography>
                </Grid>
                {!code && (
                  <Grid item xs={12}>
                    <TextFieldWebsite
                      variant="outlined"
                      fullWidth
                      size="small"
                      placeholder="invite code"
                      name="code"
                      onChange={value => setCode(value)}
                      value={code}
                      FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                    />
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                {!!code && (
                  <>
                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      spacing={1}
                    >
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
                        <Typography
                          letterSpacing={1}
                          style={{ fontWeight: 500 }}
                        >
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
                  </>
                )}
              </Grid>
            </form>
          </Box>
        </Container>
      )}
    </PublicNav>
  )
}

export default SignUpWithCode
