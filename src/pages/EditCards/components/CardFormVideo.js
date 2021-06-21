import React from 'react'
import {
  TextField,
  Grid,
  Box,
  Switch,
  FormControlLabel,
} from '@material-ui/core'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSession } from 'hooks/use-session'

const CardFormVideo = ({ card, onSubmit, pending, onRemove }) => {
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
    enableReinitialize: true
  })

  // const [prevCardId, setPrevCardId] = useState(null)

  //ensures the form is rerendered when the index is changed
  // useEffect(() => {
  //   const setReset = () => {
  //     setPrevCardId(card.id)
  //     reset({ title: card.title, text: card.text, url: card.url })
  //   }
  //   if (card.id && prevCardId !== card.id) {
  //     setReset()
  //   }
  // })

  const handleFullscreenMobile = async event => {
    // await formik.submitForm()
    onSubmit({ isFullscreenMobile: event.target.checked })
  }

  const handleLoopingVideo = async event => {
    // await formik.submitForm()
    onSubmit({ loopingVideo: event.target.checked })
  }

  const { user } = useSession()

  return (
    <Box minHeight="300px" pb={2}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container justifyContent="flex-end" spacing={3}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="title"
              label="Title"
              placeholder="Thanks for the support!"
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
              label="Subtitle"
              placeholder="Get a sneak peak at our latest video..."
              {...formik.getFieldProps('text')}
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
              name="url"
              label="Link to Video"
              placeholder="Add a link to your video"
              {...formik.getFieldProps('url')}
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={formik.handleSubmit}
            />
          </Grid>
          <Grid item xs={12} container>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={card.isFullscreenMobile}
                    onChange={handleFullscreenMobile}
                  />
                }
                label="Make fullscreen on mobile (Vimeo-only)"
              />
            </Grid>
            {user.tier !== 'free' && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={card.loopingVideo}
                      onChange={handleLoopingVideo}
                    />
                  }
                  label="Looping video"
                  disabled={!card.isFullscreenMobile}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CardFormVideo
