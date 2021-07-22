import React from 'react'
import { Link, Container, Box, Grid, Typography } from '@material-ui/core'

import PublicNav from 'layouts/PublicNav'

const Help = ({ title, text }) => {
  return (
    <PublicNav>
      <Container maxWidth="xs">
        <Box color="white" pt={8}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-start" spacing={3}>
                <Grid item xs={12} mb={1}>
                  <Typography variant="h4">
                    <b>Need immediate support?</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography mb={1}>
                    For users with a pressing technical need, reach us directly:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography mb={1}>
                    <b>email:</b>{' '}
                    <Link
                      href="mailto:help@plynth.com?subject=Plynth Help"
                      target="_blank"
                    >
                      help@plynth.com
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <b>call:</b>{' '}
                    <Link href="tel:‪4842979919‬">‪(484) 297-9919‬</Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} mb={1}>
                  <Typography variant="h5">
                    <b>
                      For non-urgent issues, please contact us or consult our
                      support page.
                    </b>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PublicNav>
  )
}

export default Help
