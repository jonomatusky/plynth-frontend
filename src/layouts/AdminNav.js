import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
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
import { Person } from '@material-ui/icons'

import { useFetch } from 'hooks/use-fetch'
import { useSession } from 'hooks/use-session'
import logo from 'images/Plynth-Loading-Final.png'
import usePageTrack from 'hooks/usePageTrack'
import useAlertStore from 'hooks/store/use-alert-store'

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
  useFetch()
  usePageTrack()
  const { error, clearError } = useAlertStore()

  if (error === 'Please complete your registration to continue.') {
    history.push('/admin/register')
    clearError()
  }

  const { logout } = useSession()
  const classes = useStyles()

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
                <Box width={30} pt={2}>
                  <Link to="/admin">
                    <img src={logo} alt="logo" style={{ maxWidth: '100%' }} />
                  </Link>
                </Box>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Box paddingBottom={2}>
                      <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                        <IconButton onClick={handleOpen}>
                          <Person />
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
                        >
                          <MenuItem component={Link} to="/admin/account">
                            My account
                          </MenuItem>

                          <MenuItem
                            component={MuiLink}
                            href="https://www.notion.so/Plynth-Customer-Success-15a675424a724de3bf6f703019a52aaf"
                            target="_blank"
                          >
                            Get Support
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                      </div>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Drawer>
          <main className={classes.content}>{children}</main>
        </div>
      </Hidden>
      <Hidden smUp>
        <main className={classes.content}>{children}</main>
      </Hidden>
    </>
  )
}

export default AdminNav
