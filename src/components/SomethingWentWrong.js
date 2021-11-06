import React from 'react'
import { Container, Grid, Typography, Box } from '@mui/material'
import Div100vh from './Div100vh'

const SomethingWentWrong = ({ backgroundColor, fontColor }) => {
  return (
    <>
      <Container maxWidth="md">
        <Div100vh>
          <Grid
            container
            direction="column"
            align="center"
            justifyContent="center"
            wrap="nowrap"
            spacing={1}
          >
            <Grid item>
              <Box mt="20vh" mb={1} maxWidth="80px" />
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                align="center"
                color={fontColor || 'white'}
              >
                Oops...
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                align="center"
                color={fontColor || 'white'}
              >
                Something went wrong
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                align="center"
                color={fontColor || 'white'}
              >
                Please refesh the page
              </Typography>
            </Grid>
          </Grid>
        </Div100vh>
      </Container>
    </>
  )
}

export default SomethingWentWrong
