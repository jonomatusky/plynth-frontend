import React from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Container,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material'
import { Check } from '@mui/icons-material'
import { isMobile } from 'react-device-detect'

import leafletLogo from 'images/leaflet_logo_color.svg'

import ScrollToTopOnMount from 'components/ScrollToTopOnMount'

import PublicNav from 'layouts/PublicNav'

const JoinTheBeta = () => {
  const { search } = useLocation()
  const history = useHistory()

  if (search === '?utm_source=qr') {
    history.push('/postcardmixtapes')
  }

  return (
    <PublicNav
      hideFooter
      right={<></>}
      left={
        <img
          src={leafletLogo}
          alt="Leaflet Logo"
          style={{ width: '100%', maxWidth: '80px' }}
        />
      }
    >
      <ScrollToTopOnMount />

      <Container maxWidth="md" id="about" disableGutters>
        <Grid
          container
          sx={{ height: '100%' }}
          justifyContent="center"
          mt={4}
          spacing={3}
        >
          <Grid item xs={12} md={6}>
            <Typography
              color="primary"
              variant={isMobile ? 'h5' : 'h4'}
              letterSpacing={1}
              style={{ fontWeight: 800 }}
              pb={3}
              pt={3}
            >
              Join the Beta
            </Typography>
            <Typography
              variant={isMobile ? null : 'h6'}
              pb={isMobile ? 0 : 2}
              style={{
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
              }}
            >
              Become a part of the Leaflet community. Get early access to our{' '}
              <b>Pro</b> features and help us choose what we develop next.
            </Typography>
            <Typography
              variant={isMobile ? null : 'h6'}
              pb={isMobile ? 1 : 4}
              style={{
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
              }}
            >
              Join now for <b>$160/year</b>
            </Typography>
            <Button
              href="https://buy.stripe.com/4gw2aA69tazigAU3cc"
              target="_blank"
              variant="contained"
              size="large"
            >
              <b>Sign Up</b>
            </Button>

            <Box pb={isMobile ? 0 : 4} pt={isMobile ? 2 : 0}></Box>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent="center">
            <Paper>
              <Box padding={3} width="100%">
                <Grid
                  container
                  width="100%"
                  justifyContent="center"
                  spacing={1}
                >
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="h5" color="primary" pb={2}>
                      <b>Beta Benefits</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Create <b>unlimited</b> experiences
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Limited to 10 on the Free tier
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Get early access to <b>Pro</b> features, including:
                    </Typography>
                    <List sx={{ padding: 0 }}>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <Check color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Remove Leaflet branding" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <Check color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Outbound links and automatic redirects" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <Check color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={'Form submissions & signups'} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <Check color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="One url/QR code for all experiences (coming soon)" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: '36px' }}>
                          <Check color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Analytics (coming soon)" />
                      </ListItem>
                    </List>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Typography>Join the Leaflet Discord server</Typography>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Typography>
                      Receive personal support from our team
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Get your projects shared on Leaflet socials
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center" mt={2} mb={1}>
                    <Button
                      href="https://buy.stripe.com/00gcPe41l6j2fwQ4gh"
                      target="_blank"
                      variant="contained"
                      size="large"
                    >
                      <b>Join Now</b>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8} mt={2} textAlign="center">
            <Typography
              style={{
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
              }}
            >
              Not ready for to join the Beta?
            </Typography>
            <Typography
              style={{
                whiteSpace: 'pre-line',
                overflowWrap: 'break-word',
              }}
            >
              Sign up for a <b>Free</b> account to create and share up to 10
              experiences.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              size="large"
              variant="secondary"
            >
              <b>Sign Up</b>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PublicNav>
  )
}

export default JoinTheBeta
