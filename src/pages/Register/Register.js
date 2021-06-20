import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  Button as MuiButton,
  TextField,
} from '@material-ui/core'

import useUserStore from 'hooks/store/use-user-store'
import { useSession } from 'hooks/use-session'
import PublicNav from 'layouts/PublicNav'
import Button from 'components/Button'

const Register = () => {
  const history = useHistory()
  const { user: authUser, logout } = useSession()
  const { user, createUser, createStatus, fetchUser } = useUserStore()

  const handleSubmit = async values => {
    try {
      values.email = authUser.email
      values.fid = authUser.uid
    } catch (err) {}

    await createUser(values)
    fetchUser()
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
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  useEffect(() => {
    if (user.id) {
      history.push('/admin')
    }
  }, [history, user])

  return (
    <PublicNav>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={11} sm={8} md={6} lg={4}>
            <Box pt={10}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                  <Box pb={1} pt={2}>
                    <Typography variant="h5">
                      <b>Choose a username</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Users will go to plynth.com/username to visit your portal
                    and access your content.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Your portal:</b> https://plynth.com/
                    {formik.values.username}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Box p={4}>
                      <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12}>
                          <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  name="username"
                                  label="Username"
                                  placeholder="username"
                                  {...formik.getFieldProps('username')}
                                  error={
                                    formik.touched.username &&
                                    Boolean(formik.errors.username)
                                  }
                                  helperText={
                                    formik.touched.username &&
                                    formik.errors.username
                                  }
                                  autoComplete="off"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button
                                  fullWidth
                                  type="submit"
                                  variant="contained"
                                  size="large"
                                  disabled={!(formik.isValid && formik.dirty)}
                                  loading={createStatus === 'loading'}
                                >
                                  Create Account
                                </Button>
                              </Grid>
                            </Grid>
                          </form>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Box>
                    <MuiButton onClick={logout} color="secondary">
                      Cancel X
                    </MuiButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PublicNav>
  )
}

export default Register
