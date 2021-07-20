import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Grid,
  Box,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  Hidden,
  IconButton,
  Link as MuiLink,
} from '@material-ui/core'
import { Portrait } from '@material-ui/icons'
// import { Person, HelpOutline } from '@material-ui/icons'

import { useFetch } from 'hooks/use-fetch'
import { useSession } from 'hooks/use-session'
import logo from 'images/plynth_logo_simple.svg'
import usePageTrack from 'hooks/use-page-track'
import useUserStore from 'hooks/store/use-user-store'
import LoadingScreen from 'components/LoadingScreen'
import SomethingWentWrong from 'components/SomethingWentWrong'
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
    backgroundColor: theme.palette.background.default,
    // paddingRight: theme.spacing(3),
    // paddingLeft: theme.spacing(3),
  },
}))

const AdminNav = ({ children }) => {
  const history = useHistory()
  const { user, status } = useUserStore()

  console.log(status)

  useFetch()
  usePageTrack()

  const { logout } = useSession()
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default
  }, [theme.palette.background.default])

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

  useEffect(() => {
    if (status === 'succeeded') {
      if (!user.username) {
        if (user.tier === 'trial') {
          history.push('/s/new-portal/username')
        } else {
          history.push('/s/register')
        }
      } else if (user.tier === 'trial') {
        history.push('/s/on-the-waitlist')
      }
    }
  }, [user.tier, history, status, user.username])

  return (
    <>
      {(status === 'idle' || status === 'loading') && (
        <LoadingScreen backgroundColor={'theme.palette.background.card'} />
      )}
      {(status === 'succeeded' || status === 'failed') && (
        <>
          <Hidden smDown>
            <div className={classes.root}>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor="left"
              >
                {/* <div className={classes.toolbar} /> */}
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
                            <MenuItem
                              component={Link}
                              to="/admin/portal/appearance"
                            >
                              My Portal
                            </MenuItem>
                            <MenuItem component={Link} to="/admin/account">
                              My Account
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
                  <SomethingWentWrong fontColor={'#555555'} />
                )}
                {status === 'succeeded' && children}
              </main>
            </div>
          </Hidden>
          <Hidden smUp>
            <main className={classes.content}>{children}</main>
          </Hidden>
        </>
      )}
    </>
  )
}

export default AdminNav
