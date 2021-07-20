import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Container, Box, Grid, Typography, Button } from '@material-ui/core'

import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import PublicNav from 'layouts/PublicNav'
import { ArrowForward, Close } from '@material-ui/icons'
import TextFieldWebsite from 'components/TextFieldWebsite'
import WebsiteNavBar from 'components/WebsiteNavBar'
import LoadingButton from '@material-ui/lab/LoadingButton'
import { useFetch } from 'hooks/use-fetch'
import useAlertStore from 'hooks/store/use-alert-store'

const NewPortalUsername = () => {
  const history = useHistory()
  const { user, updateUser, updateStatus } = useUserStore()
  const { logout } = useSession()
  const { setError } = useAlertStore()

  const location = useLocation()
  const { username } = location.search

  useFetch()

  const handleSubmit = async ({ username }) => {
    try {
      await updateUser({ username })
    } catch (err) {
      setError({ message: err.message })
    }
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Username must be at least 6 characters long')
      .max(30, 'Username must be no longer than 30 characters')
      .matches(
        /^[a-z0-9_.]*$/,
        'Username must only contain lowercase characters a-z, numbers, . and _'
      )
      .matches(
        /^(?!.*?\.\.).*?$/,
        'Username cannot contain two consecutive (.)'
      )
      .matches(/^((?!\.).*(?!\.))$/, 'Username cannot start or end with (.)')
      .required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      username: username || '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (user.username) {
      history.push('/admin')
    }
  }, [history, user])

  return (
    <PublicNav>
      <WebsiteNavBar
        right={
          <Button
            type="button"
            onClick={logout}
            size="small"
            sx={{ textTransform: 'lowercase' }}
            endIcon={<Close color="secondary" />}
          >
            <Typography color="#BBBBBB">Cancel</Typography>
          </Button>
        }
      />
      <Container maxWidth="xs">
        <Box mt={20}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="flex-start" spacing={3}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h4" color="white">
                  <b>
                    {username ? 'Confirm your portal' : 'Claim your portal'}
                  </b>
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6" color="white">
                  Fans visit your portal to snap a photo and unlock your
                  content.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextFieldWebsite
                  variant="outlined"
                  placeholder="yourname"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: 'plynth.com/',
                  }}
                  {...formik.getFieldProps('username')}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
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
                  pending={updateStatus === 'loading'}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    Claim My Portal
                  </Typography>
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default NewPortalUsername
