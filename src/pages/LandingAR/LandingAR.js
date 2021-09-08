import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Grid, Typography, Container, Box, Button } from '@material-ui/core'
// import { HashLink } from 'react-router-hash-link'
import * as yup from 'yup'
import { isMobile } from 'react-device-detect'

import TextFieldWebsite from 'components/TextFieldWebsite'
import { useFormik } from 'formik'
import useAlertStore from 'hooks/store/use-alert-store'
import useUserStore from 'hooks/store/use-user-store'
import QRCode from 'qrcode.react'

import ScrollToTopOnMount from 'components/ScrollToTopOnMount'
import {
  ArrowForward,
  // Portrait,
} from '@material-ui/icons'

import ReactPlayer from 'react-player'
import Phone from 'components/Phone'
import contentful from 'config/contentful'
import PublicNav from 'layouts/PublicNav'
import Carousel from 'react-material-ui-carousel'
import Image from 'components/Image'
import ButtonWebsite from 'components/ButtonWebsite'

// const SmoothHashLink = React.forwardRef((props, ref) => (
//   <HashLink smooth innerRef={ref} {...props} />
// ))

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const LandingAR = () => {
  const { search } = useLocation()
  const history = useHistory()
  const [content, setContent] = useState({})
  const [demoImages, setDemoImages] = useState([])
  const [videoIsReady, setVideoIsReady] = useState(false)

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  const { subscribe, subscribeStatus } = useUserStore()
  const { setError } = useAlertStore()

  const handleSubmit = async values => {
    if (subscribeStatus !== 'loading') {
      try {
        await subscribe(values.email)
      } catch (err) {
        setError({
          message: 'There was an error submitting the form. Please try again.',
        })
      }
    }
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

  useEffect(() => {
    const getContent = async () => {
      try {
        const contentResponse = await contentful.getEntry(
          '5RHjYon5qYxt1aghzh7gtn'
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

  return (
    <PublicNav hideFooter right={<></>}>
      <ScrollToTopOnMount />

      <Container maxWidth={false} id="about" disableGutters>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={2} />
          <Grid item xs={12} sm={8} md={4}>
            <Grid container sx={{ height: '100%' }} justifyContent="center">
              {subscribeStatus !== 'succeeded' && (
                <Grid item xs={11} mt={isMobile ? 6 : 15}>
                  <Typography
                    color="white"
                    variant={isMobile ? 'h5' : 'h4'}
                    letterSpacing={1}
                    style={{ fontWeight: 800 }}
                    pb={3}
                  >
                    {content.heading}
                  </Typography>
                  <Typography
                    color="white"
                    variant={isMobile ? null : 'h6'}
                    pb={2}
                    style={{
                      whiteSpace: 'pre-line',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {content.subheading}
                  </Typography>
                  <Box mt={1} maxWidth={isMobile ? null : '300px'}>
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
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <ButtonWebsite
                            type="submit"
                            fullWidth
                            endIcon={<ArrowForward />}
                            loading={subscribeStatus === 'loading'}
                          >
                            Try The Demo
                          </ButtonWebsite>
                        </Grid>
                      </Grid>
                    </form>
                  </Box>
                </Grid>
              )}

              {subscribeStatus === 'succeeded' && !isMobile && (
                <Grid item xs={11} mt={isMobile ? 6 : 15}>
                  <Typography
                    color="white"
                    variant="h4"
                    letterSpacing={1}
                    style={{ fontWeight: 800 }}
                    pb={3}
                    textAlign="center"
                  >
                    {content.claimHeading}
                  </Typography>
                  <Typography
                    color="white"
                    pb={3}
                    variant="h6"
                    style={{
                      whiteSpace: 'pre-line',
                      overflowWrap: 'break-word',
                    }}
                    textAlign="center"
                  >
                    {content.claimSubheading}
                  </Typography>
                  <Box mt={1} textAlign="center">
                    <QRCode
                      id="ar-qr"
                      value="https://ar.plynth.com"
                      size={150}
                      level={'H'}
                      includeMargin={true}
                    />
                  </Box>
                </Grid>
              )}

              {subscribeStatus === 'succeeded' && isMobile && (
                <Grid item xs={11} mt={isMobile ? 9 : 15} textAlign="center">
                  <Typography
                    color="white"
                    variant="h5"
                    letterSpacing={1}
                    style={{ fontWeight: 800 }}
                    pb={3}
                    textAlign="center"
                  >
                    Open your desktop
                  </Typography>
                  <Typography
                    color="white"
                    pb={3}
                    variant="h6"
                    style={{
                      whiteSpace: 'pre-line',
                      overflowWrap: 'break-word',
                    }}
                    textAlign="center"
                  >
                    To continue the demo, visit <b>plynth.com/ar</b> in the
                    bowser on your desktop.
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowForward />}
                    href="https://ar.plynth.com"
                  >
                    <Typography letterSpacing={1} style={{ fontWeight: 600 }}>
                      My desktop is open
                    </Typography>
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} container justifyContent="center">
            {subscribeStatus === 'succeeded' && !isMobile && (
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
            )}
            {subscribeStatus !== 'succeeded' && (
              <>
                <Grid item xs={12}>
                  <Box mt={6} />
                </Grid>
                <Phone>
                  <Box
                    height="100%"
                    width="100%"
                    display={videoIsReady ? null : 'none'}
                  >
                    <ReactPlayer
                      url={content.videoUrl}
                      height="100%"
                      width="100%"
                      overflow="hidden"
                      playsinline={true}
                      loop={true}
                      playing={true}
                      config={{ vimeo: { playerOptions: { background: 1 } } }}
                      onReady={() => setVideoIsReady(true)}
                    />
                  </Box>

                  {!videoIsReady && (
                    <Box backgroundColor="#999999" height="100%" width="100%" />
                  )}
                </Phone>
              </>
            )}
          </Grid>
          <Grid item xs={12} md={1} />
        </Grid>
      </Container>
    </PublicNav>
  )
}

export default LandingAR
