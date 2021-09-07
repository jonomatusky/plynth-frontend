import React from 'react'
import {
  Container,
  Box,
  Grid,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import QRCode from 'qrcode.react'

import PublicNav from 'layouts/PublicNav'
import useUserStore from 'hooks/store/use-user-store'
import {
  ArrowForward,
  OpenInNew,
  Person,
  PhoneIphone,
} from '@material-ui/icons'

const { REACT_APP_PUBLIC_URL } = process.env

const TryItTest = ({ title, text }) => {
  const { user } = useUserStore()

  const portal = `${REACT_APP_PUBLIC_URL}/${user.username}`

  return (
    <PublicNav
      right={
        <Box mr={1}>
          <Button
            component={RouterLink}
            to={user ? '/admin' : '/login'}
            size="small"
            sx={{ textTransform: 'none' }}
            color="secondary"
            endIcon={<Person sx={{ color: 'white' }} />}
          >
            <Typography color="white">View Account</Typography>
          </Button>
        </Box>
      }
      hideFooter
    >
      <Container maxWidth="xs">
        <Box mt={6}>
          <Grid container justifyContent="center" spacing={3}>
            <Hidden smDown>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Box color="white" mr={1}>
                    <PhoneIphone fontSize="large" />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h4" color="white">
                      <b>Now try it out</b>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="white" pb={1}>
                  1. Take out your phone
                </Typography>
                <Typography variant="h6" color="white">
                  2. Visit your portal to snap a photo of the art you linked:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="white"
                  sx={{ fontWeight: 900 }}
                  textAlign="center"
                >
                  {portal}
                </Typography>
              </Grid>
              <Grid item xs={12} mb={2} container justifyContent="center">
                <Grid item>
                  <QRCode
                    id="qr-gen"
                    value={'https://' + portal}
                    size={200}
                    level={'H'}
                    includeMargin={true}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="white" textAlign="center">
                  Ready to add more pieces and customize your account?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/admin"
                  endIcon={<ArrowForward />}
                  size="large"
                  fullWidth
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    View My Account
                  </Typography>
                </Button>
              </Grid>
            </Hidden>
            <Hidden smUp>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Box color="white" mr={1}>
                    <PhoneIphone fontSize="large" />
                  </Box>
                  <Box flexGrow={1}>
                    <Typography variant="h4" color="white">
                      <b>Now try it out</b>
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="white">
                  Visit your portal to snap a photo of the art you linked:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  href={'https://' + portal}
                  target="_blank"
                  endIcon={<OpenInNew />}
                  size="large"
                  fullWidth
                  sx={{ height: '51.5px' }}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    Test it out
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  href={'https://' + portal}
                  target="_blank"
                  endIcon={<OpenInNew />}
                  size="large"
                  fullWidth
                  sx={{ height: '51.5px' }}
                >
                  <Typography letterSpacing={1} style={{ fontWeight: 800 }}>
                    Go to Account
                  </Typography>
                </Button>
              </Grid>
            </Hidden>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default TryItTest
