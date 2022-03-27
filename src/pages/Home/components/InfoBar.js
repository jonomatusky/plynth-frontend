import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, IconButton, Tooltip, Button } from '@mui/material'

import InfoIcon from '@mui/icons-material/Info'
import withStyles from '@mui/styles/withStyles'
import leafletLogo from 'images/leaflet-logo-white.png'
import styled from 'styled-components'
import { HashLink } from 'react-router-hash-link'

const StyledInfo = styled(InfoIcon)`
  opacity: 0.4;
  &:hover {
    opacity: 0.6;
  }
`

const StyledLogo = styled.img`
  opacity: 0.4;
  width: 100%;
  max-width: 100px;
  height: 100%;
  object-fit: contain;
  object-position: 50% 50%;
  &:hover {
    opacity: 0.6;
  }
`

const StyledTooltip = withStyles(theme => ({
  tooltipPlacementTop: {
    margin: '0',
  },
  tooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    maxWidth: 220,
  },
}))(Tooltip)

const InfoBar = () => {
  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      justifyContent="space-between"
      spacing={0}
    >
      <Grid item>
        <StyledTooltip
          title={
            <>
              <Typography color="inherit">Welcome to Leaflet</Typography>
              <br />
              <Typography color="inherit">Give it a try:</Typography>
              <Typography color="inherit">
                1. Upload a photo of a piece of art
              </Typography>
              <Typography color="inherit">
                2. Access the content it's linked to!
              </Typography>
            </>
          }
          enterTouchDelay={0}
          leaveTouchDelay={10}
          arrow={true}
          placement="bottom-end"
        >
          <IconButton aria-label="info" size="large">
            <StyledInfo />
          </IconButton>
        </StyledTooltip>
      </Grid>
      <Grid item xs={4}>
        <HashLink smooth to="#about">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* <Box
            alignContent="center"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            align="center"
          > */}
            <StyledLogo src={leafletLogo} alt="Leaflet Logo" />
            {/* </Box> */}
          </Grid>
        </HashLink>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to="/admin/login"
          style={{ textTransform: 'none' }}
        >
          <Typography style={{ opacity: 0.7 }}>Sign In</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default InfoBar
