import React from 'react'

import { Dialog, Grid, Box, Typography, Fade } from '@mui/material'

import styled from 'styled-components'
import theme from 'theme'

import foundImage from 'images/plynth_logo_simple.svg'

const FoundImage = styled.img`
  height: 75px;
  width: 75px;
  margin-bottom: 2rem;
`

const FoundScreen = styled(Box)`
  background-color: white;
  color: ${theme.palette.primary.main};
  fontWeight="bold";
`

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade in={props.open} timeout={500} ref={ref} {...props} />
})

const FoundModal = props => {
  return (
    <Dialog fullScreen open={props.open} TransitionComponent={Transition}>
      <FoundScreen>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          {/* <Grow in={props.open} timeout={500}> */}
          <Grid item xs={3} align="center">
            <Box align="center">
              <FoundImage src={foundImage} />
              <Typography variant="h5">
                <Box fontWeight="fontWeightBold">{props.message}</Box>
              </Typography>
            </Box>
          </Grid>
          {/* </Grow> */}
        </Grid>
      </FoundScreen>
    </Dialog>
  );
}

export default FoundModal
