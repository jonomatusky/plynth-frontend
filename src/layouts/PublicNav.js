import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid, IconButton, Typography, Link } from '@mui/material'
import { use100vh } from 'hooks/use-100-vh'
import { useFetch } from 'hooks/use-fetch'
import usePageTrack from 'hooks/use-page-track'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import WebsiteNavBar from 'components/WebsiteNavBar'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

const PublicNav = ({
  children,
  hideFooter,
  hideNavBar,
  backgroundColor,
  ...props
}) => {
  useFetch()
  usePageTrack()

  const height = use100vh()

  return (
    <Box minHeight={height} position="relative" width="100%">
      {!hideNavBar && <WebsiteNavBar {...props} />}
      <main style={{ backgroundColor }}>
        <Box height={hideNavBar ? '0px' : '64px'} width="100%" />
        {children}
      </main>
      {!hideFooter && (
        <footer>
          <Box height="64px" width="100%" />

          <Box position="absolute" bottom={0} left={0} width="100%" pb={1}>
            <Grid container justifyContent="center">
              <Grid item xs={12} container justifyContent="center">
                <Grid item>
                  <IconButton
                    href={'https://www.instagram.com/plynthplayer/'}
                    target="_blank"
                    size="large"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      // color="#ffffffbb"
                      alt="Instagram"
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    href={'https://www.tiktok.com/@plynth'}
                    target="_blank"
                    size="large"
                  >
                    <FontAwesomeIcon
                      icon={faTiktok}
                      // color="#ffffffbb"
                      alt="Tiktok"
                    />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    component={RouterLink}
                    to="/s/contact"
                    size="large"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      // color="#ffffffbb"
                      alt="Contact"
                    />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  fontSize="10px"
                  // color="#ffffff99"
                  textAlign="center"
                >
                  Copyright © Plynth Inc 2021
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  fontSize="10px"
                  // color="#ffffff99"
                  textAlign="center"
                >
                  <Link component={RouterLink} to="/s/terms">
                    Terms of Service
                  </Link>{' '}
                  <Link component={RouterLink} to="/s/privacy">
                    Privacy Policy
                  </Link>{' '}
                  <Link component={RouterLink} to="/s/dsar">
                    DSAR Form
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </footer>
      )}
    </Box>
  )
}

export default PublicNav
