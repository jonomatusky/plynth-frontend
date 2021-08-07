import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Grid, Typography, Button } from '@material-ui/core'

import { ArrowForward } from '@material-ui/icons'
import TextFieldWebsite from 'components/TextFieldWebsite'
import useAlertStore from 'hooks/store/use-alert-store'
import usePortalStore from 'hooks/store/use-portal-store'

const UsernameForm = ({ onSubmit, setStatus }) => {
  const { setError } = useAlertStore()
  const { fetchPortal } = usePortalStore()

  const handleSubmit = async ({ username }) => {
    setStatus('loading')

    try {
      const existingUser = await fetchPortal(username)
      if (existingUser) {
        setError({
          message: 'Sorry, that username is taken. Please try a different one.',
        })
        return
      } else {
        onSubmit(username)
      }
    } catch (err) {
      if (err.code === '404') {
        onSubmit(username)
      } else {
        setError({ message: 'Something went wrong, please try again' })
      }
    }

    setStatus('succeeded')
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
      username: '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" color="white">
            <b>Choose a username</b>
          </Typography>
        </Grid>
        <Grid item xs={12} mb={1}>
          <Typography color="white">
            Viewers visit this page to snap a photo and unlock your content.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextFieldWebsite
            autoFocus
            variant="outlined"
            placeholder="yourname"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: 'plynth.com/',
            }}
            {...formik.getFieldProps('username')}
            error={Boolean(formik.errors.username)}
            helperText={formik.errors.username}
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
              Test it out
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default UsernameForm
