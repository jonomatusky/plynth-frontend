import React, { useState } from 'react'
import {
  Grid,
  Box,
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogTitle,
  Button,
} from '@material-ui/core'
import { experimentalStyled as styled } from '@material-ui/core/styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useRequest } from 'hooks/use-request'
import ButtonCardLoading from './ButtonCardLoading'

const ColorTextField = styled(({ fontColor, ...rest }) => (
  <TextField {...rest} />
))(props => ({
  '& input:valid + fieldset': {
    borderColor: props.fontColor,
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: props.fontColor,
    borderWidth: 2,
  },
}))

const CardDownloadDialog = ({ packId, cardIndex, style, open, onClose }) => {
  const { request, status } = useRequest()
  const [error, setError] = useState(null)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
  })

  const handleSubmit = async values => {
    setError(null)
    try {
      await request({
        url: `/packs/${packId}/cards/${cardIndex}/download`,
        method: 'POST',
        data: values,
      })
    } catch (err) {
      setError(err.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box pt={1}>
          <b>Send to My Email</b>
        </Box>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography>
                {`Enter your email and we'll send the file to your inbox.`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <ColorTextField
                fontColor={'black'}
                color="secondary"
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                label="Email"
                placeholder="Email"
                InputLabelProps={{
                  shrink: true,
                }}
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center" spacing={1}>
              <Grid item xs={12}>
                <ButtonCardLoading
                  fullWidth
                  color={'black'}
                  type="submit"
                  // loading={status === 'loading'}
                  disabled={status === 'succeeded'}
                >
                  {status === 'succeeded' ? <b>Sent ✔</b> : 'Send'}
                </ButtonCardLoading>
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography>{error}</Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box pb={1}>
                  <Button
                    type="button"
                    fullWidth
                    color="secondary"
                    onClick={onClose}
                  >
                    {status === 'succceeded' ? 'Cancel' : 'Close'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CardDownloadDialog
