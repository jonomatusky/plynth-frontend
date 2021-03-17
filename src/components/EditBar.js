import React from 'react'
import {
  AppBar,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  Grid,
  Box,
  Button as MuiButton,
} from '@material-ui/core'
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom'
import { Public } from '@material-ui/icons'

import theme from 'theme'
import Button from 'components/Button'

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
      <div style={{ width: '100%' }}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box flexGrow={1}>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              // onChange={handleChange}
              variant="fullWidth"
            >
              <Tab
                label="Cards"
                component={RouterLink}
                to="cards"
                value="cards"
              />
              <Tab
                label="Appearance"
                component={RouterLink}
                to="appearance"
                value="appearance"
              />
              <Tab
                label="Access"
                component={RouterLink}
                to="access"
                value="access"
              />
            </Tabs>
          </Box>
          <Box padding={1}>
            <MuiButton
              size="small"
              color="default"
              component={RouterLink}
              to={'/admin'}
            >
              Save Draft
            </MuiButton>
          </Box>
          <Box padding={1}>
            <Button
              size="small"
              endIcon={<Public />}
              component={RouterLink}
              to={'/admin'}
            >
              <Box paddingLeft={0.5} paddingRight={0.5}>
                <b>Publish</b>
              </Box>
            </Button>
          </Box>
        </Box>
      </div>

      <Divider />
    </AppBar>
  )
}

export default EditBar
