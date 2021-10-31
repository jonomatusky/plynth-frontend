import React from 'react'
import { TextField, Grid, Box, FormControlLabel, Switch } from '@mui/material'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from 'components/Button'
import useUserStore from 'hooks/store/use-user-store'

const CardFormText = ({ card, onSubmit, pending, onRemove }) => {
  const { user } = useUserStore()

  const validationSchema = Yup.object({
    title: Yup.string().max(50, 'Enter a title under 50 characters'),
    text: Yup.string(),
    url: Yup.string().url(`Must be a valid URL. Include http:// or https://`),
  })

  const formik = useFormik({
    initialValues: {
      title: card.title || '',
      text: card.text || '',
      url: card.url || '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  })

  const handleEmailDownload = async event => {
    onSubmit({ emailDownload: event.target.checked })
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box minHeight="300px">
        <Grid container justifyContent="flex-end" spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="title"
              label="Title"
              placeholder="Thanks for the support!"
              {...formik.getFieldProps('title')}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="text"
              label="Subtitle"
              placeholder="Get a sneak peak at our latest video..."
              {...formik.getFieldProps('text')}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="url"
              label="Direct Download Link"
              placeholder="Add a link to your download"
              {...formik.getFieldProps('url')}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {user.tier && user.tier !== 'free' && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={card.emailDownload}
                    onChange={handleEmailDownload}
                  />
                }
                label="Let users send the file to their email"
              />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            container
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                loading={pending}
                size="large"
              >
                Save Card
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  )
}

export default CardFormText
