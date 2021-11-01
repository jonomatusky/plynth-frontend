import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import // Grid,
// Box,
// Menu,
// MenuItem,
// Drawer,
// Divider,
// IconButton,
// Link as MuiLink,
'@mui/material'
// import { Portrait } from '@mui/icons-material'
// import { Person, HelpOutline } from '@mui/icons-material'

import { useFetch } from 'hooks/use-fetch'
// import { useSession } from 'hooks/use-session'
// import logo from 'images/plynth_logo_simple.svg'
import usePageTrack from 'hooks/use-page-track'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
import Onboarding from 'components/Onboarding'
import useAlertStore from 'hooks/store/use-alert-store'
import usePackStore from 'hooks/store/use-pack-store'
import { Box } from '@mui/system'

// import useAlertStore from 'hooks/store/use-alert-store'

export const drawerWidth = 70

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#fafafa',
    // paddingRight: theme.spacing(3),
    // paddingLeft: theme.spacing(3),
  },
}))

const AdminNav = ({ children }) => {
  const history = useHistory()
  const { user, status, updateUser } = useUserStore()
  const [onboardingIsOpen, setOnboardingIsOpen] = useState()

  const { status: packStatus } = usePackStore()
  const { setError } = useAlertStore()

  useFetch()
  usePageTrack()

  // const { logout } = useSession()
  const classes = useStyles()
  const theme = useTheme()

  // const [anchorEl, setAnchorEl] = useState(null)

  // const handleOpen = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = event => {
  //   setAnchorEl(null)
  // }

  // const handleLogout = async () => {
  //   logout()
  // }

  useEffect(() => {
    if (status === 'succeeded') {
      if (!user.username) {
        history.push('/register/username')
      } else if (user.tier === 'trial') {
        history.push('/s/on-the-waitlist')
      } else {
        document.body.style.backgroundColor = theme.palette.background.default
      }
    } else if (status === 'failed') {
      setError({
        message: 'Problem retrieving profile. Please refresh the page.',
      })
    }
  }, [
    user.tier,
    history,
    status,
    user.username,
    theme.palette.background.default,
    setError,
  ])

  const openOnboarding = () => {
    setOnboardingIsOpen(true)
  }

  const handleCloseOnboarding = () => {
    if (!user.completedSignup) {
      updateUser({ completedSignup: true })
    }
    setOnboardingIsOpen(false)
  }

  useEffect(() => {
    if (
      status === 'succeeded' &&
      user.tier !== 'trial' &&
      !user.completedSignup
    ) {
      setOnboardingIsOpen(true)
    }
  }, [user, status])

  useEffect(() => {
    if (packStatus === 'failed') {
      setError({
        message: 'Unable to get your packs. Please refresh the page.',
      })
    }
  })

  return (
    <>
      {(status === 'idle' || status === 'loading') && (
        <LoadingScreen backgroundColor={'theme.palette.background.card'} />
      )}
      {(status === 'succeeded' || status === 'failed') && (
        <>
          <Onboarding
            setIsOpen={onboardingIsOpen}
            onClose={handleCloseOnboarding}
          />
          {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <div className={classes.root}>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor="left"
              >
                <Grid
                  container
                  direction="column"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ height: '100%' }}
                >
                  <Grid item>
                    <Box width={25} pt={2}>
                      <Link to="/admin">
                        <img
                          src={logo}
                          alt="logo"
                          style={{ maxWidth: '100%' }}
                        />
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item container justifyContent="center">
                    <Grid item xs={12} container justifyContent="center">
                      <Grid item>
                        <Box paddingBottom={2}>
                          <IconButton
                            onClick={handleOpen}
                            onMouseOver={handleOpen}
                            size="large"
                          >
                            <Portrait fontSize="large" />
                          </IconButton>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            transitionDuration={0}
                            anchorOrigin={{
                              horizontal: 'right',
                              vertical: 'top',
                            }}
                            anchorPosition={{ left: 0, top: -20 }}
                            onClose={handleClose}
                            MenuListProps={{ onMouseLeave: handleClose }}
                          >
                            {user.admin && (
                              <MenuItem component={Link} to="/admin/super">
                                🦸🏾‍♀️ Super Admin
                              </MenuItem>
                            )}
                            <MenuItem component={Link} to="/admin/account">
                              My Account
                            </MenuItem>
                            <MenuItem onClick={openOnboarding}>
                              Show Onboarding
                            </MenuItem>
                            <MenuItem
                              component={MuiLink}
                              href="https://help.plynth.com"
                              target="_blank"
                            >
                              Get Help
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </Menu>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Drawer>
              <main className={classes.content}>
                {status === 'failed' && (
                  <SomethingWentWrong
                    backgroundColor={theme.palette.background.default}
                    fontColor={'#555555'}
                  />
                )}
                {status === 'succeeded' && children}
              </main>
            </div>
          </Box> */}
          {/* <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <main className={classes.content}>{children}</main>
          </Box> */}
          <main className={classes.content}>
            {status === 'failed' && (
              <SomethingWentWrong
                backgroundColor={theme.palette.background.default}
                fontColor={'#555555'}
              />
            )}
            {status === 'succeeded' && (
              <>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                  {children}
                </Box>

                <Box
                  height="calc(100vh-48px)"
                  mt="48px"
                  overflow="hidden"
                  sx={{ display: { xs: 'none', md: 'block' } }}
                >
                  {children}
                </Box>
              </>
            )}
          </main>
        </>
      )}
    </>
  )
}

export default AdminNav
