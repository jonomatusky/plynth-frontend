import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button,
  styled,
  Typography,
} from '@material-ui/core'

import { HashLink } from 'react-router-hash-link'
import plynthLogoWhite from 'images/plynth_logo_white.svg'

const StyledLogo = styled('img')({
  opacity: `${props => props.opacity || 1}`,
  width: '100%',
  maxWidth: '80px',
  height: '100%',
  objectFit: 'contain',
  objectPosition: '50% 50%',
  '&:hover': {
    opacity: 0.7,
  },
})

const WebsiteNavBar = ({ left, right, position, opacity }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#000000'
  }, [])

  return (
    <AppBar position="absolute" top="0" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          {left}
          <Box flexGrow={1}>
            <Grid container justify="center">
              <Grid item>
                <HashLink smooth to="/">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <StyledLogo
                      opacity={opacity}
                      src={plynthLogoWhite}
                      alt="Plynth Logo"
                    />
                  </Grid>
                </HashLink>
              </Grid>
            </Grid>
          </Box>
          {right ? (
            right
          ) : (
            <Button
              component={RouterLink}
              to="/admin/login"
              size="small"
              sx={{ textTransform: 'lowercase' }}
            >
              <Typography color="#BBBBBB">
                <b>_</b>sign in
              </Typography>
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
