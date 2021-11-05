import React, { useState } from 'react'
import {
  AppBar,
  Divider,
  Tabs,
  Tab,
  Box,
  Grid,
  Typography,
  Link,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'
import OnboardingTooltip from 'components/OnboardingTooltip'

import Logo from 'images/plynth_logo_color.svg'
import Image from 'components/Image'
import { AccountCircle } from '@mui/icons-material'
import { useSession } from 'hooks/use-session'

// const drawerWidth = 70

const useStyles = makeStyles({
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
  tabRoot: {
    minWidth: 120,
  },
})

const BarAccount = ({ children }) => {
  const [portalTooltipIsOpen, setPortalTooltipIsOpen] = useState(true)

  const { user } = useUserStore()
  const classes = useStyles()
  const location = useLocation()
  const { logout } = useSession()

  const urlElements = location.pathname.split('/')
  const value = urlElements.slice(0, 3).join('/')

  const { portal, completedSignup } = user || {}
  const { title, text, image } = portal || {}
  const showPortalReminder =
    !!completedSignup &&
    !title &&
    !text &&
    !image &&
    portalTooltipIsOpen &&
    value === '/admin/packs'

  const userType =
    user.tier === 'free' ||
    user.tier === 'artist' ||
    user.tier === 'agency' ||
    user.tier === 'trial'
      ? 'old'
      : 'new'

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = event => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <div style={{ width: '100%' }}>
          <Grid container>
            <>
              <Grid item sm={12} md={7} container alignItems="center">
                <Grid item pl={1} pr={1}>
                  <RouterLink to="/admin">
                    <Image src={Logo} height="24px" width="91px" />
                  </RouterLink>
                </Grid>
                {userType === 'new' ? (
                  <Grid item container>
                    <Box
                      pl="24px"
                      height="48px"
                      display="flex"
                      alignItems="center"
                      width="100%"
                    >
                      <Box flexGrow={1}>
                        <Typography variant="h5">
                          <b>Your Experiences</b>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ) : (
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab
                      label={
                        <Typography>
                          <b>Packs</b>
                        </Typography>
                      }
                      component={RouterLink}
                      to="/admin/packs"
                      value="/admin/packs"
                      classes={{ root: classes.tabRoot }}
                    />
                    <Tab
                      label={
                        <OnboardingTooltip
                          onClose={() => setPortalTooltipIsOpen(false)}
                          placement="bottom"
                          open={showPortalReminder}
                          title="It looks like you haven't set up your portal yet! Click here to get started."
                        >
                          <Typography>
                            <b>Portal</b>
                          </Typography>
                        </OnboardingTooltip>
                      }
                      component={RouterLink}
                      to="/admin/portal/appearance"
                      onClick={() => setPortalTooltipIsOpen(false)}
                      value="/admin/portal"
                      classes={{ root: classes.tabRoot }}
                    />

                    {user.admin && (
                      <Tab
                        label={
                          <Typography>
                            <b>AR</b>
                          </Typography>
                        }
                        component={RouterLink}
                        to="/admin/pieces"
                        value="/admin/pieces"
                        classes={{ root: classes.tabRoot }}
                      />
                    )}
                  </Tabs>
                )}
              </Grid>

              <Grid item md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Box
                  pl="24px"
                  height="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  width="100%"
                >
                  <Box pr={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      // onClick={handleClick}
                      disableElevation
                      sx={{ textTransform: 'none' }}
                    >
                      <b>Invite Friends</b>
                    </Button>
                  </Box>
                  {value === '/admin/pieces' && (
                    <Box pr={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleClick}
                        disableElevation
                        sx={{ textTransform: 'none' }}
                      >
                        <b>Upgrade</b>
                      </Button>
                    </Box>
                  )}
                  <Box pr={1}>
                    <IconButton
                      onClick={handleOpen}
                      onMouseOver={handleOpen}
                      size="large"
                    >
                      <AccountCircle fontSize="large" />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      transitionDuration={0}
                      anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom',
                      }}
                      anchorPosition={{ left: 0, top: -20 }}
                      onClose={handleClose}
                      MenuListProps={{ onMouseLeave: handleClose }}
                    >
                      {user.admin && (
                        <MenuItem component={RouterLink} to="/admin/super">
                          🦸🏾‍♀️ Super Admin
                        </MenuItem>
                      )}
                      <MenuItem component={RouterLink} to="/admin/account">
                        My Account
                      </MenuItem>
                      {/* <MenuItem onClick={openOnboarding}>
                              Show Onboarding
                            </MenuItem> */}
                      <MenuItem
                        component={Link}
                        href="https://help.plynth.com"
                        target="_blank"
                      >
                        Get Help
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Grid>
            </>
          </Grid>
        </div>
        <Divider />
      </AppBar>

      {/* <Box sx={{ display: { xs: 'block', md: 'none' } }}>{children}</Box>

      

      <Box
        height="calc(100vh-48px)"
        mt="48px"
        overflow="hidden"
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {children}
      </Box> */}
    </>
  )
}

export default BarAccount
