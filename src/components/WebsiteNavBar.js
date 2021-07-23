import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button as MuiButton,
  styled,
  Typography,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import { HashLink } from 'react-router-hash-link'
import plynthLogoWhite from 'images/plynth_logo_white.svg'
import { useSession } from 'hooks/use-session'

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
  const { user, initializing } = useSession()

  useEffect(() => {
    document.body.style.backgroundColor = '#000000'
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="absolute" top="0" color="transparent" elevation={0}>
      <Toolbar padd>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          alignContent="center"
        >
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
            <>
              {!initializing && (
                <Box color="white">
                  <Hidden mdUp>
                    <MuiButton
                      variant="contained"
                      component={RouterLink}
                      to="/register"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      <Typography>
                        <b>Get Access</b>
                      </Typography>
                    </MuiButton>
                    <IconButton
                      edge="end"
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu"
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem component={RouterLink} to="/register">
                        Sign Up
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to={user ? '/admin' : '/login'}
                      >
                        Sign In
                      </MenuItem>
                    </Menu>
                  </Hidden>

                  <Hidden mdDown>
                    <Box display="flex">
                      <Box mr={1}>
                        <MuiButton
                          component={RouterLink}
                          to={user ? '/admin' : '/login'}
                          size="small"
                          sx={{ textTransform: 'none' }}
                        >
                          <Typography color="#BBBBBB">
                            <b>_</b>sign in
                          </Typography>
                        </MuiButton>
                      </Box>

                      <MuiButton
                        component={RouterLink}
                        to="/register"
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        <Typography>
                          <b>Get Early Access</b>
                        </Typography>
                      </MuiButton>
                    </Box>
                  </Hidden>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default WebsiteNavBar
