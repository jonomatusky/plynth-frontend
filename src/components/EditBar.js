import React from 'react'
import {
  AppBar,
  makeStyles,
  Divider,
  Tabs,
  Tab,
  Box,
  Button as MuiButton,
  Typography,
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Public, Save } from '@material-ui/icons'

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
  tabRoot: {
    minWidth: 120,
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
            >
              <Tab
                label="Cards"
                component={RouterLink}
                to="cards"
                value="cards"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Appearance"
                component={RouterLink}
                to="appearance"
                value="appearance"
                classes={{ root: classes.tabRoot }}
              />
              <Tab
                label="Access"
                component={RouterLink}
                to="access"
                value="access"
                classes={{ root: classes.tabRoot }}
              />
            </Tabs>
          </Box>
          <Box paddingRight="5px">
            <MuiButton
              size="small"
              component={RouterLink}
              to={'/admin'}
              endIcon={<Save />}
            >
              <Typography variant="body2">Save</Typography>
            </MuiButton>
          </Box>
          <Box paddingRight={1}>
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
