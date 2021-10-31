import React, { useState } from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  IconButton,
} from '@mui/material'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'

import { ArrowBackIos, Send } from '@mui/icons-material'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import { useRequest } from 'hooks/use-request'
import AdminNav from 'layouts/AdminNav'
import { Link } from 'react-router-dom'
import PackListItem from 'pages/PacksView/components/PackListItem'
import usePackStore from 'hooks/store/use-pack-store'

const validationSchema = yup.object({
  email: yup
    .string('Enter an email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const SuperAdmin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { packs } = usePackStore()
  const { request } = useRequest()

  const { setError, setMessage } = useAlertStore()

  const handleSubmit = async ({ email }) => {
    setIsLoading(true)
    try {
      const { message } = await request({
        method: 'PUT',
        url: '/auth/invite',
        data: {
          email,
        },
      })
      setMessage({ message })
    } catch (err) {
      setError({ message: err.message })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  return (
    <AdminNav>
      <Grid container>
        <Grid item>
          <Box margin={2}>
            <IconButton
              component={Link}
              to="/admin"
              color="secondary"
              size="large"
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box pt={1}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                  <Box pb={1}>
                    <Typography variant="h5" align="center">
                      <b>Super Admin</b>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>Send New Invite</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper>
                        <Box p={3}>
                          <Grid container justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                              <form onSubmit={formik.handleSubmit}>
                                <Box display="flex" alignItems="center" mb={1}>
                                  <Box flexGrow={1}>
                                    <TextField
                                      autoFocus
                                      variant="outlined"
                                      fullWidth
                                      size="small"
                                      placeholder="email"
                                      {...formik.getFieldProps('email')}
                                      error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                      }
                                      helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                      }
                                      autoComplete="off"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      type="email"
                                      sx={{ height: '38px' }}
                                    />
                                  </Box>
                                  <Box pl={2}>
                                    <LoadingButton
                                      type="submit"
                                      variant="contained"
                                      endIcon={<Send />}
                                      size="medium"
                                      fullWidth
                                      sx={{ height: '38px' }}
                                      loading={isLoading}
                                    >
                                      <Typography
                                        letterSpacing={1}
                                        style={{ fontWeight: 800 }}
                                      >
                                        Send
                                      </Typography>
                                    </LoadingButton>
                                  </Box>
                                </Box>
                              </form>
                            </Grid>
                          </Grid>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography pt={2}>
                    <b>Default Packs</b>
                  </Typography>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                  {packs
                    .filter(pack => pack.isDefault)
                    .map(pack => {
                      return (
                        <Grid
                          item
                          xs={12}
                          container
                          justifyContent="center"
                          alignItems="center"
                          key={pack.id}
                        >
                          <PackListItem pack={pack} onSelectPack={() => {}} />
                        </Grid>
                      )
                    })}
                </Grid>
                <Grid item xs={12}>
                  <Box height="24px" />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </AdminNav>
  )
}

export default SuperAdmin
