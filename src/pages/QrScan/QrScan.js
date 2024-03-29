import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import posthog from 'posthog-js'
import { Container, Grid, Link, TextField, Typography } from '@mui/material'
import usePageTrack from 'hooks/use-page-track'

import { request } from 'util/client'
import { LoadingButton } from '@mui/lab'
import LoadingScreen from 'components/LoadingScreen'

const QrScan = () => {
  const { qrId } = useParams()
  const [status, setStatus] = useState('idle')
  const [qr, setQr] = useState(null)

  usePageTrack()

  console.log(qr)
  console.log(status)

  useEffect(() => {
    const getQR = async () => {
      try {
        const res = await request({
          url: `/qr/${qrId}`,
        })

        if (((res || {}).qr || {}).status === 'unclaimed') {
          setStatus('unclaimed')
        } else {
          setQr(res.qr)
          setStatus('succeeded')
        }
      } catch (err) {
        setStatus('failed')
      }
    }

    if (!!qrId && status === 'idle') {
      getQR()
    }

    return
  }, [qrId, status])

  const handleSubmit = async ({ url, email, displayName }) => {
    setStatus('pending')
    try {
      const res = await request({
        url: `/qr`,
        data: {
          qrId: qrId,
          url: url,
          email: email,
          displayName: displayName,
        },
        method: 'POST',
      })
      console.log(res)
    } catch (err) {
      setStatus('failed')
      console.log(err)
    }

    posthog.people.set({ email, displayName })

    setStatus('succeeded')
  }

  const validationSchema = yup.object({
    url: yup
      .string('Enter a URL')
      .url('Enter a valid URL including http:// or https://')
      .required('URL is required'),
    email: yup.string('Enter your email').email('Enter a valid email'),
    displayName: yup
      .string('Enter your name')
      .max(64, 'Name must be less than 64 characters'),
  })

  const formik = useFormik({
    initialValues: {
      url: 'https://',
      email: '',
      displayName: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  if (!!(qr || {}).url) {
    window.location.href = qr.url
    return <></>
  } else if (status === 'failed') {
    return (
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" pt={7} textAlign="center">
              Something Went Wrong
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>Please refresh the page and try again.</Typography>
          </Grid>
        </Grid>
      </Container>
    )
  } else if (status === 'unclaimed') {
    return (
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <Grid container justifyContent="flex-start" spacing={2} pt={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Claim Your Card</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Enter a link to share with other attendees, like your Instagram,
                Bandcamp or Linktree. Next time someone scans this QR code,
                they'll be redirected here:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                // size="small"
                label="URL"
                autoComplete="off"
                type="url"
                {...formik.getFieldProps('url')}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Tell us what you're sharing and add your email address below to
                be included in the round-up email after the event!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="What are you sharing? (Optional)"
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
                label="Email (Optional)"
                type="email"
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                We'll keep your email private any only use it to send you the
                one follow-up email.
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                  Claim My Card
                </Typography>
              </LoadingButton>
            </Grid>
            <Grid item xs={12} pb={3}>
              <Typography color="inherit" variant="body2" textAlign="center">
                <Link href="https://plynth.com" target="_blank" color="inherit">
                  Powered by Plynth
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  } else if (status === 'succeeded') {
    return (
      <Container>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" pt={7} textAlign="center">
              Success!
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography>
              You claimed your card. Scan the QR code again to test it out!
            </Typography>
          </Grid>
        </Grid>
        <div
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            top: 'auto',
            textAlign: 'center',
            // color: 'white',
            paddingTop: '5px',
            paddingBottom: '5px',
            position: 'absolute',
            zIndex: 2000,
            // backgroundColor: 'black',
            fontSize: '12px',
          }}
        >
          <Typography color="inherit" variant="body2">
            <Link href="https://plynth.com" target="_blank" color="inherit">
              Powered by Plynth
            </Link>
          </Typography>
        </div>
      </Container>
    )
  } else {
    return <LoadingScreen backgroundColor="white" />
  }
}

export default QrScan
