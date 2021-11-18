import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Button as MuiButton,
  styled,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { HashLink } from 'react-router-hash-link'
import plynthLogo from 'images/plynth_logo_color.svg'
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

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="absolute" top="0" color="transparent" elevation={0}>
      <Toolbar>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
        >
          {!!left ? (
            left
          ) : (
            <Box flexGrow={1}>
              <Grid container>
                <Grid item>
                  <HashLink smooth to="/">
                    <Grid container direction="column" alignItems="center">
                      <StyledLogo
                        opacity={opacity}
                        src={plynthLogo}
                        alt="Plynth Logo"
                      />
                    </Grid>
                  </HashLink>
                </Grid>
              </Grid>
            </Box>
          )}

          {right ? (
            right
          ) : (
            <>
              {!initializing && (
                <Box>
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <MuiButton
                      variant="contained"
                      component={RouterLink}
                      to="/s/waitlist"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      <Typography>
                        <b>Sign Up</b>
                      </Typography>
                    </MuiButton>
                    <IconButton
                      edge="end"
                      aria-controls="menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      color="inherit"
                      size="large"
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
                      <MenuItem component={RouterLink} to="/signup">
                        Sign Up
                      </MenuItem>
                      <MenuItem
                        component={RouterLink}
                        to={user ? '/admin' : '/login'}
                      >
                        Sign In
                      </MenuItem>
                    </Menu>
                  </Box>

                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Box mr={1}>
                      <MuiButton
                        component={RouterLink}
                        to={user ? '/admin' : '/login'}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        <Typography>Sign In</Typography>
                      </MuiButton>
                    </Box>

                    <MuiButton
                      variant="contained"
                      component={RouterLink}
                      to="/s/waitlist"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      <Typography>
                        <b>Sign Up</b>
                      </Typography>
                    </MuiButton>
                  </Box>
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
