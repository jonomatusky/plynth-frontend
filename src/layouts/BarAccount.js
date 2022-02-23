import React, { useState } from 'react'
import {
  AppBar,
  Divider,
  Tabs,
  Tab,
  Box,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'
import useUserStore from 'hooks/store/use-user-store'
import OnboardingTooltip from 'components/OnboardingTooltip'

import { AccountCircle, Add } from '@mui/icons-material'
import { useSession } from 'hooks/use-session'
import { drawerWidth } from './AdminNav'

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

const BarAccount = ({ right, left, children }) => {
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
    value === '/admin/exp'

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

  const handleCreateExperience = () => {
    return
  }

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Box width="100%" display="flex" alignItems="center" height="52px">
          <Box flexGrow={1} height="100%" alignItems="flex-end">
            <>
              {left || (
                <>
                  {userType !== 'new' && (
                    <Tabs
                      value={value}
                      indicatorColor="primary"
                      textColor="primary"
                      sx={{
                        height: '100%',
                        display: { xs: 'none', md: 'flex' },
                      }}
                    >
                      <Tab
                        label={<Typography>Packs</Typography>}
                        component={RouterLink}
                        to="/admin/experiences"
                        value="/admin/experiences"
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
                            <Typography>Portal</Typography>
                          </OnboardingTooltip>
                        }
                        component={RouterLink}
                        to="/admin/portal/appearance"
                        onClick={() => setPortalTooltipIsOpen(false)}
                        value="/admin/portal"
                        classes={{ root: classes.tabRoot }}
                      />
                      <Tab
                        label={<Typography>AR</Typography>}
                        component={RouterLink}
                        to="/admin/pieces"
                        value="/admin/pieces"
                        classes={{ root: classes.tabRoot }}
                      />
                    </Tabs>
                  )}
                </>
              )}
            </>
          </Box>
          {right || (
            <>
              {/* <Box pr={1} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Button
                  variant="outlined"
                  color="primary"
                  // onClick={handleClick}
                  disableElevation
                  sx={{ textTransform: 'none' }}
                >
                  <b>Invite Friends</b>
                </Button>
              </Box> */}
              <Box pr={1} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCreateExperience}
                  disableElevation
                  startIcon={<Add />}
                >
                  Create
                </Button>
              </Box>

              <Box pr={1}>
                <IconButton onClick={handleOpen}>
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
                  <MenuItem
                    component={Link}
                    href="https://airtable.com/shrmOgSoAqE7bBOmI"
                    target="_blank"
                  >
                    Report a Bug
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Box>
        <Divider />
      </AppBar>
    </>
  )
}

export default BarAccount
