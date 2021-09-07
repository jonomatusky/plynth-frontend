import React, { useState } from 'react'
import {
  Grid,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@material-ui/core'
import * as yup from 'yup'

import TextFieldWebsite from 'components/TextFieldWebsite'
import { ArrowForward } from '@material-ui/icons'
import { useFormik } from 'formik'
import ButtonWebsite from 'components/ButtonWebsite'

const LinkForm = ({ onSubmit }) => {
  const [type, setType] = useState('video')

  let validationSchema

  if (type === 'video') {
    validationSchema = yup.object({
      link: yup.string('Add a link to your video.').url('Must be a valid url.'),
    })
  } else if (type === 'music') {
    validationSchema = yup.object({
      link: yup.string('Add a link to your music.').url('Must be a valid url.'),
    })
  } else {
    validationSchema = yup.object({
      link: yup
        .string('Enter your message.')
        .max(300, 'Please keep it under 300 characters.'),
    })
  }

  const handleSubmit = ({ link }) => {
    onSubmit({ link, type })
  }

  const formik = useFormik({
    initialValues: {
      link: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const handleChange = event => {
    setType(event.target.value)
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="white">
            <b>Add your content</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="white">What would you like to link to?</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              aria-label="type"
              name="type1"
              value={type}
              color="primary"
              onChange={handleChange}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                color="white"
                width="100%"
              >
                <FormControlLabel
                  value="video"
                  control={<Radio color="primary" sx={{ color: 'white' }} />}
                  label={
                    <Typography variant="h6">
                      <b>Video</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="music"
                  control={<Radio color="primary" sx={{ color: 'white' }} />}
                  label={
                    <Typography variant="h6">
                      <b>Music</b>
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="text"
                  control={<Radio color="primary" sx={{ color: 'white' }} />}
                  label={
                    <Typography variant="h6">
                      <b>Text</b>
                    </Typography>
                  }
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} mb={2}>
          <Typography color="white">
            {type === 'video' &&
              'Add a link to your video, like a Youtube or Vimeo video.'}
            {type === 'music' &&
              'Add a link to your music, like a album or playlist on Spotify.'}
            {type === 'text' &&
              'Add your message, like an update for your fans.'}
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
          <TextFieldWebsite
            autoFocus
            variant="outlined"
            fullWidth
            multiline={type === 'text'}
            rows={type === 'text' ? 4 : null}
            size="small"
            placeholder={
              type === 'video'
                ? 'Add a Youtube or Vimeo URL'
                : type === 'music'
                ? 'Add a Spotify or Apple Music Link'
                : 'Add a message'
            }
            {...formik.getFieldProps('link')}
            FormHelperTextProps={{ sx: { fontSize: '16px' } }}
            error={formik.touched.link && Boolean(formik.errors.link)}
            helperText={formik.touched.link && formik.errors.link}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonWebsite type="submit" endIcon={<ArrowForward />}>
            Next
          </ButtonWebsite>
        </Grid>
      </Grid>
    </form>
  )
}

export default LinkForm
