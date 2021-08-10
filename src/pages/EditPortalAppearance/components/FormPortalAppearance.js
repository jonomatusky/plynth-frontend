import React from 'react'
import { TextField, Grid, Box, Typography } from '@material-ui/core'

import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormPortalAppearance = ({ portal, onSubmit, pending, onRemove }) => {
  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string().max(100, 'Enter a message under 100 characters'),
    instructions: Yup.string().max(
      100,
      'Enter a instructions under 100 characters'
    ),
  })

  const { title, text, instructions } = portal || {}

  const formik = useFormik({
    initialValues: {
      title: title || '',
      text: text || '',
      instructions: instructions || '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-end" spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="title"
            label="Title"
            placeholder={`eg, @username`}
            {...formik.getFieldProps('title')}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            onBlur={formik.handleSubmit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="text"
            label="Welcome message"
            placeholder="eg, Take a photo of the artwork to learn more"
            {...formik.getFieldProps('text')}
            autoComplete="off"
            InputLabelProps={{
              shrink: true,
            }}
            onBlur={formik.handleSubmit}
          />
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="instructions"
              label="Instructions"
              placeholder="eg, Take a photo of the artwork"
              {...formik.getFieldProps('instructions')}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={formik.handleSubmit}
            />
          </Grid>
          <Grid item xs={12}>
            <Box pl={1} pr={1} mt={1}>
              <Typography variant="body2">
                <i>
                  These instructions will be overlayed on their camera feed
                  while they're taking a photo
                </i>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Box display="none">
        <button type="submit">Submit</button>
      </Box>
    </form>
  )
}

export default FormPortalAppearance
