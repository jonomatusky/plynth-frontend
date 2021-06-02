import React from 'react'
import { Box, Container, Typography, Link } from '@material-ui/core'
import { Grid } from '@material-ui/core'

import WebsiteNavBar from 'components/WebsiteNavBar'

const Contact = () => {
  return (
    <>
      <WebsiteNavBar />
      <Container>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Box pt={20} color="white">
              <Grid container jusifyContent="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h4">
                    <b>Contact Us</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    For immediate support, email us at:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Link
                      href="mailto:help@plynth.com?subject=Plynth Help"
                      target="_blank"
                    >
                      help@plynth.com
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Or call us at:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Link href="tel:6106398519">6106398519</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Contact
