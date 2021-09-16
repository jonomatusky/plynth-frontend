import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Grid, Typography, Container, Box } from '@material-ui/core'
// import { HashLink } from 'react-router-hash-link'
import * as yup from 'yup'
import { isMobile } from 'react-device-detect'
import { useFormik } from 'formik'

import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

import contentful from 'config/contentful'
import PublicNav from 'layouts/PublicNav'
import Carousel from 'react-material-ui-carousel'
import Image from 'components/Image'
import useUserStore from 'hooks/store/use-user-store'
import useAlertStore from 'hooks/store/use-alert-store'
import TextFieldWebsite from 'components/TextFieldWebsite'
import ButtonWebsite from 'components/ButtonWebsite'
import { ArrowForward } from '@material-ui/icons'

// const SmoothHashLink = React.forwardRef((props, ref) => (
//   <HashLink smooth innerRef={ref} {...props} />
// ))

const LandingARDemo = () => {
  const { search } = useLocation()
  const history = useHistory()
  const [content, setContent] = useState({})
  const [demoImages, setDemoImages] = useState([])

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  useEffect(() => {
    const getContent = async () => {
      try {
        const contentResponse = await contentful.getEntry(
          '5FN3gDvSDZQLgm5VMTbvRo'
        )
        const imagesResponse = await contentful.getEntries({
          content_type: 'arImageDemos',
          'fields.active': true,
          order: 'fields.order',
        })
        setContent(contentResponse.fields)
        setDemoImages(imagesResponse.items)
      } catch (err) {}
    }

    getContent()
  }, [])

  const { subscribe, subscribeStatus } = useUserStore()
  const { setError } = useAlertStore()

  const handleSubmit = async values => {
    if (subscribeStatus !== 'loading') {
      try {
        await subscribe({ email: values.email, tags: ['ar-waitlist'] })
      } catch (err) {
        setError({
          message: 'There was an error submitting the form. Please try again.',
        })
      }
    }
  }

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
  })

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
    <PublicNav hideFooter right={<></>}>
      <ScrollToTopOnMount />

      <Container maxWidth="lg" id="about" disableGutters>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={1} />
          <Grid item xs={12} sm={8} md={4}>
            <Grid container sx={{ height: '100%' }} justifyContent="center">
              <Grid item xs={11} mt={isMobile ? 6 : 15}>
                <Typography
                  color="white"
                  variant="h4"
                  letterSpacing={1}
                  style={{ fontWeight: 800 }}
                  pb={2}
                >
                  {content.claimHeading}
                </Typography>
                <Typography
                  color="white"
                  pb={3}
                  style={{
                    whiteSpace: 'pre-line',
                    overflowWrap: 'break-word',
                  }}
                >
                  {content.claimSubheading}
                </Typography>
                <Typography color="white" variant="h5">
                  <b>Get Updates</b>
                </Typography>
                <Typography color="white" pb={2}>
                  Like the demo? Sign up here and we'll let you know when it
                  launches:
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container justifyContent="flex-start" spacing={3}>
                    <Grid item xs={12}>
                      <TextFieldWebsite
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="email"
                        placeholder="email"
                        {...formik.getFieldProps('email')}
                        FormHelperTextProps={{ sx: { fontSize: '16px' } }}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ButtonWebsite
                        type="submit"
                        fullWidth
                        endIcon={<ArrowForward />}
                        loading={subscribeStatus === 'loading'}
                      >
                        Sign Up
                      </ButtonWebsite>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} container justifyContent="center">
            <Grid item xs={12}>
              <Box mt={6}>
                {
                  <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
                    {demoImages.map(demoImage => {
                      return (
                        <Box maxWidth="100%" key={demoImage.sys.id}>
                          <Image
                            width="100%"
                            height="70vh"
                            style={{ objectFit: 'contain' }}
                            src={
                              demoImage.fields.image
                                ? 'https:' +
                                  demoImage.fields.image.fields.file.url
                                : null
                            }
                            alt={demoImage.fields.title}
                          />
                        </Box>
                      )
                    })}
                  </Carousel>
                }
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={1} />
        </Grid>
      </Container>
    </PublicNav>
  )
}

export default LandingARDemo
