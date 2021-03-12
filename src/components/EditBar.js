import React from 'react'
import { AppBar, makeStyles, Divider, Tabs, Tab } from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import theme from 'theme'

const drawerWidth = 70

const useStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
  },
})

const EditBar = () => {
  const classes = useStyles()
  const location = useLocation()

  const urlElements = location.pathname.split('/')
  const value = urlElements[urlElements.length - 1]

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        // onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab
          label="Cards"
          component={RouterLink}
          to="cards"
          value="cards"
          disableRipple
        />
        <Tab
          label="Appearance"
          component={RouterLink}
          to="appearance"
          value="appearance"
          disableRipple
        />
        <Tab
          label="Access"
          component={RouterLink}
          to="access"
          value="access"
          disableRipple
        />
      </Tabs>
      <Divider />
    </AppBar>
  )
}

export default EditBar
