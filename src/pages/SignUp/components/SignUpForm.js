import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  // Box,
  Grid,
  Typography,
  Button,
  // Divider,
  TextField,
  Link,
} from '@mui/material'
import * as yup from 'yup'

import firebase from 'config/firebase'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
// import GoogleLogo from 'images/btn_google_light_normal_ios.svg'
import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import { LoadingButton } from '@mui/lab'
// import usePackStore from 'hooks/store/use-pack-store'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  // displayName: yup
  //   .string('Enter your first name')
  //   .max(48, 'Name must be less than 48 characters')
  //   .required('Name is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .required('Password is required'),
})

const SignUpForm = () => {
  const history = useHistory()
  const { user, logout } = useSession()
  const { subscribe } = useUserStore()
  // const { createPack, packs } = usePackStore()
  const { setError } = useAlertStore()
  const [status, setStatus] = useState('idle')
  const [userData, setUserData] = useState({
    email: null,
    password: null,
    // displayName: '',
  })

  const handleSubmit = async ({ email, password }) => {
    setStatus('submitted')
    setUserData({ email, password })
    if (status !== 'submitted') {
      try {
        await logout()
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      } catch (err) {
        if (err.code === 'auth/invalid-email') {
          setError({ message: 'Please enter a valid email address' })
        } else if (err.code === 'auth/email-already-in-use') {
          setError({
            message: `Another account is using ${email}. Please sign in instead.`,
          })
        } else {
          console.log(err)
          setError({
            message:
              'There was an error creating your account. Please try again.',
          })
        }
        console.log('firebase error')
        console.log(err.message)

        setStatus('error')
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

  // var provider = new firebase.auth.GoogleAuthProvider()

  // const handleSignUpWithGoogle = async () => {
  //   clearError()
  //   try {
  //     await firebase.auth().signInWithPopup(provider)
  //   } catch (err) {
  //     console.log(err)
  //     setError({ message: 'Unable to sign in' })
  //   }
  // }

  useEffect(() => {
    // const handleSignIn = async () => {
    //   try {
    //     await createMe({ displayName: userData.displayName })
    //   } catch (err) {
    //     console.log('create user error')
    //     console.log(err.message)
    //     setStatus('error')
    //   }
    //   if (user.email) {
    //     try {
    //       subscribe({ email: user.email, tags: ['waitlist'] })
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }
    // }

    if (user) {
      // if (status === 'idle') {
      history.push(`/admin`)
      // } else {
      //   handleSignIn()
      // }
    }
  }, [subscribe, history, user, status, userData.displayName])

  // useEffect(() => {
  //   const handleCreatePiece = async () => {
  //     if (storeUser && packs.length === 0) {
  //       try {
  //         const createdPack = await createPack({
  //           name: 'My New Experience',
  //           style: { backgroundColor: '#fafafa', fontColor: '#222222' },
  //           isPublic: false,
  //           shareWithLink: true,
  //           cards: [
  //             {
  //               type: 'ar',
  //             },
  //           ],
  //         })

  //         if (createdPack.id) {
  //           history.push(`/admin/pieces/${createdPack.id}/edit`)
  //         } else {
  //           history.push(`/admin`)
  //         }
  //       } catch (err) {
  //         setStatus('error')
  //       }
  //     }
  //   }

  //   if (storeUser) {
  //     if (status !== 'idle') {
  //       handleCreatePiece()
  //     } else {
  //     }
  //   }
  // }, [history, status, createPack, storeUser, packs.length])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Create an account to start building your first interactive
            experience. It's free.
          </Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Full Name"
            {...formik.getFieldProps('displayName')}
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            label="Email"
            type="email"
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
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={formik.isSubmitting === true || status === 'submitted'}
          >
            <Typography
              letterSpacing={1}
              style={{ fontWeight: 900, textTransform: 'none' }}
            >
              Create Account
            </Typography>
          </LoadingButton>
        </Grid>
        {/* <Grid item xs={12} container alignItems="center" spacing={1}>
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
        </Grid> */}

        {/* <Grid item xs={12}>
          <LoadingButton
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
            loading={formik.isSubmitting === true || status === 'submitted'}
          >
            <Box display="flex" mr="24px">
              <img src={GoogleLogo} alt="Google Logo" />
            </Box>
            <Typography letterSpacing={1} style={{ fontWeight: 500 }}>
              Sign up with Google
            </Typography>
          </LoadingButton>
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="body2">
            By signing up, you agree to our{' '}
            <Link component={RouterLink} to="/s/terms">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link component={RouterLink} to="/s/privacy">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" textAlign="center">
            Already have an account?{' '}
            <Button
              sx={{ textTransform: 'none' }}
              component={RouterLink}
              size="small"
              to="/login"
            >
              <b>Sign In</b>
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}

export default SignUpForm
