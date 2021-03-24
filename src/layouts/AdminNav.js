import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'

import Divider from '@material-ui/core/Divider'

import { Grid, Box, Avatar, Menu, MenuItem } from '@material-ui/core'
import { useAuth } from 'hooks/use-auth'
import { useUserStore } from 'hooks/store/use-user-store'

const drawerWidth = 70

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
  const classes = useStyles()
  const { user } = useUserStore()

  const [anchorEl, setAnchorEl] = useState(null)
  const { logout } = useAuth()

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
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {/* <div className={classes.toolbar} /> */}
        <Box height="100%"></Box>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item></Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Box paddingBottom={2}>
                  <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                    <Avatar src={user.avatarLink || null} />
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      transitionDuration={0}
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorPosition={{ left: 0, top: -20 }}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {children}
      </main>
    </div>
  )
}

export default AdminNav
