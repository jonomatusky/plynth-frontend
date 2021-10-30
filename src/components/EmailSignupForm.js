import React from 'react'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/material'

import { useRequest } from 'hooks/use-request'

import SimpleForm from 'components/SimpleForm'
import WebsiteTextField from './WebsiteTextField'

const EmailSignupForm = () => {
  const { status, request } = useRequest()
  const history = useHistory()

  const handleClose = () => {
    history.push('/')
  }

  const handleSubmit = async values => {
    const userData = { user: values }
    await request({
      url: `/users/subscribe`,
      method: 'POST',
      data: userData,
    })
  }

  const initialValues = {
    email: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address.')
      .required('Required'),
  })

  return (
    <>
      {status !== 'succeeded' ? (
        <SimpleForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          status={status}
          onClose={handleClose}
          ps={`By submitting this form you agree to recieve emails from the
          Plynth team.`}
        >
          <WebsiteTextField
            color="website"
            variant="outlined"
            fullWidth
            name="email"
            label="Enter your email"
            placeholder="Email"
            type="email"
            autoCapitalize="off"
            autoCorrect="off"
            InputLabelProps={{
              sx: { color: 'white' },
              shrink: true,
            }}
            inputProps={{
              sx: { color: 'white' },
            }}
          />
        </SimpleForm>
      ) : (
        <Typography variant="h6">
          Great, you're all signed up. Stay tuned for more!
        </Typography>
      )}
    </>
  )
}

export default EmailSignupForm
