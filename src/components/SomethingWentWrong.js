import React, { useEffect } from 'react'
import { Container, Grid, Typography, Box } from '@material-ui/core'
import Div100vh from './Div100vh'

const SomethingWentWrong = ({ backgroundColor, fontColor }) => {
  useEffect(() => {
    if (backgroundColor) {
      document.body.style.backgroundColor = backgroundColor || 'black'
    }
  }, [backgroundColor])

  return (
    <>
      <Container maxWidth="md">
        <Div100vh>
          <Grid
            container
            direction="column"
            align="center"
            justify="center"
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
